import { atom, useRecoilState } from 'recoil';
import { lineParser } from 'app/components/Reditor/utils/parsers/parser';
import produce from 'immer';
import {
  deleteNthChar,
  insertNthChar,
  sliceWithRest,
} from 'app/utils/functions';
import { useTextWidths } from '../Cursor';
import { NoteM } from './typings';
import { Line, LineNodeM, LineId, NoteId } from './typings/note';

// -------------------------------------------------------------------------------------
// Notes
// -------------------------------------------------------------------------------------

export const notesS = atom<Record<number, NoteM>>({
  key: 'notesS',
  default: {},
});

export const useNotes = () => {
  const [notes, setNotes] = useRecoilState(notesS);
  const getNote = (noteId: NoteId) => {
    return notes[noteId];
  };

  const setNote = (noteId: NoteId) => (
    initialState: NoteM | ((note: NoteM) => NoteM),
  ) => {
    if (typeof initialState === 'function') {
      setNotes(n => {
        return {
          ...notes,
          [noteId]: initialState(n[noteId]),
        };
      });
    } else {
      setNotes({ ...notes, [initialState.id]: initialState });
    }
  };

  return { getNote, setNote };
};

// -------------------------------------------------------------------------------------
// Note
// -------------------------------------------------------------------------------------

export const lineInit: Line = {
  value: '',
  widths: [],
};

export const noteS = atom<NoteM | null>({
  key: 'noteS',
  default: null,
});

/**
 * Note's Model
 *
 * - ノートの内容の操作
 * - UIには関与しない
 */
export const useNote = (noteId: number) => {
  const { getNote, setNote: sss } = useNotes();
  const note = getNote(noteId);
  const setNote = sss(noteId); // FIXME: name
  const { textWidths } = useTextWidths();

  const _updateLine = (ln: number, line: string) => {
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        n.lines[ln] = { value: line, widths: textWidths(line) };
      });
    });
  };

  const newLine = (ln: number, col: number) => {
    const line = note?.lines[ln].value ?? '';
    const [half, rest] = sliceWithRest(line, col);
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        n.lines = n.lines
          .slice(0, ln)
          .concat([{ value: half, widths: textWidths(half) }])
          .concat([{ value: rest, widths: textWidths(rest) }])
          .concat(n.lines.slice(ln + 1));
      });
    });
  };

  const insertChar = (ln: number, col: number, value: string) => {
    const line = note?.lines[ln].value ?? '';
    const inserted = insertNthChar(line, col, value);
    _updateLine(ln, inserted);
  };

  const removeChar = (ln: number, col: number) => {
    if (col === 0) {
      removeLine(ln);
      return;
    }

    const line = note?.lines[ln].value ?? '';
    const deleted = deleteNthChar(line, col - 1);
    _updateLine(ln, deleted);
  };

  const removeLine = (ln: number) => {
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        const l1 = note.lines[ln - 1];
        const l2 = note.lines[ln];

        n.lines = note.lines
          .slice(0, ln - 1)
          .concat([mergeLine(l1, l2)])
          .concat(note.lines.slice(ln + 1));
      });
    });
  };

  return { note, setNote, removeChar, insertChar, newLine };
};

const mergeLine = (l1: Line, l2: Line): Line => {
  return {
    value: l1.value.concat(l2.value),
    widths: l1.widths.concat(l2.widths),
  };
};

// FIXME: move
export const parse = (text: string, index: number): LineNodeM => {
  const result = lineParser(text, `line${index}` as LineId, index).tryParse(
    `${text}`,
  );

  return { type: 'line', line: result };
};
