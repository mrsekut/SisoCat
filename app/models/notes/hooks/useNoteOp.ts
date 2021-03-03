import { cursorPos, useCursorKeymap } from 'app/models/Cursor';
import { focuedLineS, useFocuedLine } from 'app/models/FocuedLine';
import { decN } from 'app/utils/functions';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { noteS, useNote } from '..';

/**
 * useCursorKeymapとuseNoteの接続
 * e.g. カーソル位置の文字削除、文字入力
 */

//  FIXME: clean
export const useNoteOp = (noteId: number) => {
  const n = useNote(noteId);
  const note = useRecoilValue(noteS(noteId));
  const { left, right, ...c } = useCursorKeymap();
  const { insertChar, removeChar } = useFocuedLine();
  const [focuedLine, setFocuedLine] = useRecoilState(focuedLineS);
  const pos = useRecoilValue(cursorPos);

  const newLine = () => {
    n.newLine(pos.ln, pos.col);
    down();
  };

  const remove = useCallback(() => {
    removeChar(pos.col);
    if (pos.col === 0) {
      // const lines = note.note?.lines ?? [];
      // const prevLine = lines[cursor.pos.ln - 1];
      // move(prevLine.value.length, cursor.pos.ln - 1);
    } else {
      left();
    }
  }, [pos.col]);

  const insert = useCallback((value: string) => {
    insertChar(pos.col, value);
    right(value.length);
  }, []);

  const up = useCallback(() => {
    const nextLine = note.lines[decN(pos.ln, 1)];
    setFocuedLine(nextLine);
    c.up();
  }, []);

  const down = useCallback(() => {
    const nextLine = note.lines[pos.ln + 1];
    setFocuedLine(nextLine);
    c.down();
  }, []);

  const begin = useCallback(() => {
    c.move(0);
  }, []);

  const end = useCallback(() => {
    c.move(focuedLine.length);
  }, []);

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
