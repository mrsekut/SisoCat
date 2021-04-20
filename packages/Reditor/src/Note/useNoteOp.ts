import { useCallback } from 'react';
import { useRecoilCallback } from 'recoil';
import { useCursorKeymap, cursorColS, cursorLnS, cursorPosS } from '../Cursor';
import { focuedLineS, useFocuedLine } from '../FocusedLine';
import { decN } from '../Shared/functions';
import { displayLids, noteLinesS, useLines } from '.';

/**
 * useCursorKeymapとuseNoteの接続
 * e.g. カーソル位置の文字削除、文字入力
 */

export const useNoteOp = (noteId: number) => {
  const l = useLines(noteId);
  const c = useCursorKeymap();
  const f = useFocuedLine();

  const newLine = useRecoilCallback(
    ({ snapshot }) => async () => {
      const pos = await snapshot.getPromise(cursorPosS);
      l.newLine(pos.ln, pos.col);

      c.down();
      begin();
    },
    [],
  );

  const remove = useRecoilCallback(
    ({ snapshot }) => async () => {
      const col = await snapshot.getPromise(cursorColS);
      const isBegin = col === 0;

      if (isBegin) {
        const ln = await snapshot.getPromise(cursorLnS);
        if (ln === 0) return;

        const lines = await snapshot.getPromise(noteLinesS(noteId));

        l.removeLine(ln);
        c.up();
        c.move(lines[decN(ln, 1)].length);
      } else {
        f.removeChar(col);
        c.left();
      }
    },
    [],
  );

  const insert = useRecoilCallback(
    ({ snapshot }) => async (value: string) => {
      const col = await snapshot.getPromise(cursorColS);
      f.insertValue(col, value);
      c.right(value.length);
    },
    [],
  );

  const up = useRecoilCallback(
    ({ snapshot }) => async () => {
      const ln = await snapshot.getPromise(cursorLnS);

      if (ln > 0) {
        c.up();
      }
    },
    [],
  );

  const right = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const col = await snapshot.getPromise(cursorColS);
      const isEnd = focuedLine.length === col;

      if (isEnd) {
        down();
        begin();
      } else {
        c.right();
      }
    },
    [],
  );

  const down = useRecoilCallback(
    ({ snapshot }) => async () => {
      const ln = await snapshot.getPromise(cursorLnS);
      const lineIds = await snapshot.getPromise(displayLids(noteId));
      if (ln + 1 < lineIds.length) {
        c.down();
      }
    },
    [],
  );

  const left = useRecoilCallback(
    ({ snapshot }) => async () => {
      const col = await snapshot.getPromise(cursorColS);
      const isBegin = col === 0;

      if (isBegin) {
        up();
        end();
      } else {
        c.left();
      }
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
