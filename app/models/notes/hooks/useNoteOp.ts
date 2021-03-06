import {
  cursorCol,
  cursorLn,
  cursorPos,
  useCursorKeymap,
} from 'app/models/Cursor';
import { focuedLineS, useFocuedLine } from 'app/models/FocuedLine';
import { decN } from 'app/utils/functions';
import { useCallback } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { noteS, useNote } from '..';

/**
 * useCursorKeymapとuseNoteの接続
 * e.g. カーソル位置の文字削除、文字入力
 */

//  FIXME: clean
export const useNoteOp = (noteId: number) => {
  const n = useNote(noteId);
  const c = useCursorKeymap();
  const { insertChar, removeChar } = useFocuedLine();
  const setFocuedLine = useSetRecoilState(focuedLineS);

  const newLine = useRecoilCallback(
    ({ snapshot }) => async () => {
      const pos = await snapshot.getPromise(cursorPos);
      n.newLine(pos.ln, pos.col);
      down();
    },
    [],
  );

  const remove = useRecoilCallback(
    ({ snapshot }) => async () => {
      const pos = await snapshot.getPromise(cursorPos);
      removeChar(pos.col);
      if (pos.col === 0) {
        const pos = await snapshot.getPromise(cursorPos);
        n.removeLine(pos.ln);
        up();
        end();
      } else {
        left();
      }
    },
    [],
  );

  const insert = useRecoilCallback(
    ({ snapshot }) => async (value: string) => {
      const col = await snapshot.getPromise(cursorCol);
      insertChar(col, value);
      c.right(value.length);
    },
    [],
  );

  const up = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const ln = await snapshot.getPromise(cursorLn);
      n.updateLine(ln, focuedLine);
      const note = await snapshot.getPromise(noteS(noteId));
      const nextLine = note.lines[decN(ln, 1)];
      setFocuedLine(nextLine);
      c.up();
    },
    [],
  );

  const right = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const pos = await snapshot.getPromise(cursorPos);
      const isEnd = focuedLine.length === pos.ln;
      console.log({ f: focuedLine.length, c: pos.col, isEnd });
      if (isEnd) {
        c.down();
        begin();
      } else {
        c.right(1);
      }
    },
    [],
  );

  const down = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const ln = await snapshot.getPromise(cursorLn);
      n.updateLine(ln, focuedLine);
      const note = await snapshot.getPromise(noteS(noteId));
      const nextLine = note.lines[ln + 1];
      setFocuedLine(nextLine);
      c.down();
    },
    [],
  );

  const left = useRecoilCallback(
    ({ set, snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const pos = await snapshot.getPromise(cursorPos);
      const isEnd = focuedLine.length === pos.ln;
      console.log({ f: focuedLine.length, c: pos.col, isEnd });
      c.left();
    },
    [],
  );

  const begin = useCallback(() => {
    c.move(0);
  }, []);

  const end = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      c.move(focuedLine.length);
    },
    [],
  );

  return {
    newLine,
    remove,
    insert,
    up,
    left,
    right,
    down,
    begin,
    end,
  };
};
