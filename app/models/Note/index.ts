import { note0 } from 'app/components/Reditor/utils/dummy';
import {
  LineId,
  LineNodeM,
  NoteId,
  UserM,
} from 'app/components/Reditor/utils/types';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { lineParser } from 'app/components/Reditor/utils/parsers/parser';
import produce from 'immer';
import { deleteNthChar, insertNthChar } from 'app/utils/functions';
import { useTextWidths } from '../Cursor';

export type ResNote = {
  readonly id: NoteId;
  readonly author: UserM;
  readonly title: string;
  readonly created: number;
  readonly updated: number;
  readonly lines: Line[];
  readonly references: NoteId[];
  readonly referenced: NoteId[]; // NOTE: 必要？
};

export type Line = {
  value: string;
  widths: number[];
};

export const noteS = atom<ResNote | null>({
  key: 'noteS',
  default: null,
});

/**
 * ノートの内容の操作
 * カーソルの位置などには依存しない
 * NoteのModelのようなイメージ
 * UIには関与しない
 */
export const useNote = () => {
  const [note, setNote] = useRecoilState(noteS);
  const { textWidths } = useTextWidths();

  useEffect(() => {
    setNote(note0);
  }, []);

  const updateLine = (ln: number, line: string) => {
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        n.lines[ln] = { value: line, widths: textWidths(line) };
      });
    });
  };

  const insertChar = (ln: number, col: number, value: string) => {
    const line = note?.lines[ln].value ?? '';
    const inserted = insertNthChar(line, col, value);
    updateLine(ln, inserted);
  };

  const removeChar = (ln: number, col: number) => {
    const line = note?.lines[ln].value ?? '';
    const deleted = deleteNthChar(line, col - 1);
    updateLine(ln, deleted);
  };

  return { note, setNote, removeChar, insertChar };
};

// FIXME: move
export const parse = (text: string, index: number): LineNodeM => {
  const result = lineParser(text, `line${index}` as LineId, index).tryParse(
    `${text}`,
  );

  return { type: 'line', line: result };
};
