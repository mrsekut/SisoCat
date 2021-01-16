import { note0 } from 'app/components/Reditor/utils/dummy';
import {
  LineId,
  LineNodeM,
  NoteId,
  UserM,
} from 'app/components/Reditor/utils/types';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import * as E from 'fp-ts/lib/Either';
import { run } from 'parser-ts/lib/code-frame';
import { lineParser } from 'app/components/Reditor/utils/parsers/parser';
import produce from 'immer';
import { deleteNthChar } from 'app/components/Reditor/utils/functions';

export type ResNote = {
  readonly id: NoteId;
  readonly author: UserM;
  readonly title: string;
  readonly created: number;
  readonly updated: number;
  readonly lines: string[];
  readonly references: NoteId[];
  readonly referenced: NoteId[]; // NOTE: 必要？
};

export const noteS = atom<ResNote | null>({
  key: 'noteS',
  default: null,
});

/**
 * ノートの内容の操作
 * カーソルの位置などには依存しない
 * NoteのModelのようなイメージ
 */
export const useNote = () => {
  const [note, setNote] = useRecoilState(noteS);

  useEffect(() => {
    setNote(note0);
  }, []);

  const updateLine = (ln: number, line: string) => {
    setNote(note => {
      if (note == null) return note;
      return produce(note, n => {
        n.lines[ln] = line;
      });
    });
  };

  const insertValue = (ln: number, col: number) => (value: string) => {
    console.log('insert');
  };

  const removeChar = (ln: number, col: number) => {
    const line = note?.lines[ln] ?? '';
    const deleted = deleteNthChar(line, col - 1);
    updateLine(ln, deleted);
  };

  return { note, setNote, removeChar };
};

// FIXME: move
export const parse = (text: string, index: number): LineNodeM => {
  const result = run(
    lineParser(text, `line${index}` as LineId, index),
    `${text}`,
  );
  if (E.isRight(result)) {
    return { type: 'line', line: result.right };
  }
  throw Error('parse error');
};
