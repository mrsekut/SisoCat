import { cursorPos, useCursorKeymap } from 'app/models/Cursor';
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
  const { left, right, ...c } = useCursorKeymap();
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
        // const lines = note.note?.lines ?? [];
        // const prevLine = lines[cursor.pos.ln - 1];
        // move(prevLine.value.length, cursor.pos.ln - 1);
      } else {
        left();
      }
    },
    [],
  );

  const insert = useRecoilCallback(
    ({ snapshot }) => async (value: string) => {
      const pos = await snapshot.getPromise(cursorPos);
      insertChar(pos.col, value);
      right(value.length);
    },
    [],
  );

  const up = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const pos = await snapshot.getPromise(cursorPos);
      n.updateLine(pos.ln, focuedLine);
      const note = await snapshot.getPromise(noteS(noteId));
      const nextLine = note.lines[decN(pos.ln, 1)];
      setFocuedLine(nextLine);
      c.up();
    },
    [],
  );

  const down = useRecoilCallback(
    ({ snapshot }) => async () => {
      const focuedLine = await snapshot.getPromise(focuedLineS);
      const pos = await snapshot.getPromise(cursorPos);
      n.updateLine(pos.ln, focuedLine);
      const note = await snapshot.getPromise(noteS(noteId));
      const nextLine = note.lines[pos.ln + 1];
      setFocuedLine(nextLine);
      c.down();
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
function noteLines(noteId: number): import('recoil').RecoilState<unknown> {
  throw new Error('Function not implemented.');
}
