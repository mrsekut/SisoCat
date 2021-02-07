import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { lineParser } from 'app/components/Reditor/utils/parsers/parser';
import produce from 'immer';
import {
  deleteNthChar,
  insertNthChar,
  sliceWithRest,
} from 'app/utils/functions';
import { useTextWidths } from '../Cursor';
import { BlockM, Line, NoteM } from './typings';
import { LineNodeM, LineId } from './typings/note';

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
// FIXME: clean
export const useNote = (init?: NoteM) => {
  const [note, setNote] = useRecoilState(noteS);
  const { textWidths } = useTextWidths();
  const {
    insertChar: bInsertChar,
    removeChar: bRemoveChar,
    newLine: bNewLine,
  } = useBlock(textWidths); // FIXME:

  useEffect(() => {
    if (init != null) setNote(init);
  }, []);

  const newLine = (blockIdx: number, ln: number, col: number) => {
    if (note == null) return;
    const block = note.blocks[blockIdx];
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        n.blocks[blockIdx] = bNewLine(block, ln, col);
      });
    });
  };

  const insertChar = (
    blockIdx: number,
    ln: number,
    col: number,
    value: string,
  ) => {
    if (note == null) return;
    const block = note.blocks[blockIdx];
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        n.blocks[blockIdx] = bInsertChar(block, ln, col, value);
      });
    });
  };

  const removeChar = (blockIdx: number, ln: number, col: number) => {
    if (note == null) return;
    const block = note.blocks[blockIdx];
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        n.blocks[blockIdx] = bRemoveChar(block, ln, col);
      });
    });
  };

  return { note, setNote, removeChar, insertChar, newLine };
};

export const blockS = atom<BlockM | null>({
  key: 'blockS',
  default: null,
});

// FIXME: clean
// hooksですらない
// BlockのModel
// Block内で完結する操作
// useNote内で使用される
const useBlock = (textWidths: (line: string) => number[]) => {
  const _updateLine = (block: BlockM, ln: number, line: string) => {
    if (block == null) return block;
    return produce(block, n => {
      n.lines[ln] = { value: line, widths: textWidths(line) };
    });
  };

  const newLine = (block: BlockM, ln: number, col: number) => {
    const line = block?.lines[ln].value ?? '';
    const [half, rest] = sliceWithRest(line, col);
    if (block == null) return block;
    return produce(block, n => {
      n.lines = n.lines
        .slice(0, ln)
        .concat([{ value: half, widths: textWidths(half) }])
        .concat([{ value: rest, widths: textWidths(rest) }])
        .concat(n.lines.slice(ln + 1));
    });
  };

  const insertChar = (
    block: BlockM,
    ln: number,
    col: number,
    value: string,
  ) => {
    const line = block?.lines[ln].value ?? '';
    const inserted = insertNthChar(line, col, value);
    return _updateLine(block, ln, inserted);
  };

  const removeChar = (block: BlockM, ln: number, col: number) => {
    if (col === 0) {
      return _removeLine(block, ln);
    }

    const line = block?.lines[ln].value ?? '';
    const deleted = deleteNthChar(line, col - 1);
    return _updateLine(block, ln, deleted);
  };

  const _removeLine = (block: BlockM, ln: number) => {
    if (block == null) return block;
    return produce(block, n => {
      const l1 = block.lines[ln - 1];
      const l2 = block.lines[ln];

      n.lines = block.lines
        .slice(0, ln - 1)
        .concat([mergeLine(l1, l2)])
        .concat(block.lines.slice(ln + 1));
    });
  };

  return { removeChar, insertChar, newLine };
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
