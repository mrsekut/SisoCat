import { useCallback } from 'react';
import { useSetRecoilState, useRecoilCallback } from 'recoil';
import { useCursorKeymap, cursorCol, cursorLn, cursorPos } from '../Cursor';
import { focuedLineS, useFocuedLine } from '../FocusedLine';
import { decN } from '../Shared/functions';
import { noteLines, noteS, useLines } from './model';

/**
 * useCursorKeymapとuseNoteの接続
 * e.g. カーソル位置の文字削除、文字入力
 */

export const useNoteOp = (noteId: number) => {
  const l = useLines(noteId);
  const c = useCursorKeymap();
  const f = useFocuedLine();
  const setFocuedLine = useSetRecoilState(focuedLineS);

  const newLine = useRecoilCallback(
    ({ snapshot }) => async () => {
      const pos = await snapshot.getPromise(cursorPos);
      l.newLine(pos.ln, pos.col);

      c.down();
      begin();
    },
    [],
  );

  const remove = useRecoilCallback(
    ({ snapshot }) => async () => {
      const col = await snapshot.getPromise(cursorCol);
      const isBegin = col === 0;

      if (isBegin) {
        const ln = await snapshot.getPromise(cursorLn);
        if (ln === 0) return;

        const focuedLine = await snapshot.getPromise(focuedLineS);
        const lines = await snapshot.getPromise(noteLines(noteId));

        l.removeLine(ln, focuedLine);
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
      const col = await snapshot.getPromise(cursorCol);
      f.insertChar(col, value);
      c.right(value.length);
    },
    [],
  );

  const up = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const ln = await snapshot.getPromise(cursorLn);
      l.updateLine(ln, focuedLine);

      const note = await snapshot.getPromise(noteS(noteId));
      const nextLine = note.lines[decN(ln, 1)];
      if (nextLine != null) {
        setFocuedLine(nextLine);
        c.up();
      }
    },
    [],
  );

  const right = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const col = await snapshot.getPromise(cursorCol);
      const isEnd = focuedLine.length === col;

      if (isEnd) {
        c.down();
        begin();
      } else {
        c.right();
      }
    },
    [],
  );

  const down = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const ln = await snapshot.getPromise(cursorLn);
      l.updateLine(ln, focuedLine);
      const note = await snapshot.getPromise(noteS(noteId));
      const nextLine = note.lines[ln + 1];
      if (nextLine != null) {
        setFocuedLine(nextLine);
        c.down();
      }
    },
    [],
  );

  const left = useRecoilCallback(
    ({ snapshot }) => async () => {
      const col = await snapshot.getPromise(cursorCol);
      const isBegin = col === 0;

      if (isBegin) {
        c.up();
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
