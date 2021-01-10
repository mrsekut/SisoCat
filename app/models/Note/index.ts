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

export const useNote = () => {
  const [note, setNote] = useRecoilState(noteS);

  useEffect(() => {
    setNote(note0);
  }, []);

  return { note, setNote };
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
