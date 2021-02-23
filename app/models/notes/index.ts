import { atom, useRecoilState } from 'recoil';
import produce from 'immer';
import {
  deleteNthChar,
  insertNthChar,
  sliceWithRest,
} from 'app/utils/functions';
import { useTextWidths } from '../Cursor';
import { NoteM } from './typings';
import { Line, NoteId } from './typings/note';

// -------------------------------------------------------------------------------------
// Notes
// -------------------------------------------------------------------------------------

export const noteS = (id: NoteId) =>
  atom<NoteM | null>({
    key: `noteS${id}`,
    default: null,
  });

// -------------------------------------------------------------------------------------
// Note
// -------------------------------------------------------------------------------------

export const lineInit: Line = {
  value: '',
  widths: [],
};

/**
 * Note's Model
 *
 * - ノートの内容の操作
 * - UIには関与しない
 */
export const useNote = (noteId: number) => {
  const [note, setNote] = useRecoilState(noteS(noteId));
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
