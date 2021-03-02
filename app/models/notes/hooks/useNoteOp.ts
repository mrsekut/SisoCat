import { cursorPos, useCursorKeymap } from 'app/models/Cursor';
import { useFocuedLine } from 'app/models/FocuedLine';
import { useRecoilValue } from 'recoil';
import { useNote } from '..';

/**
 * useCursorKeymapとuseNoteの接続
 * e.g. カーソル位置の文字削除、文字入力
 */

export const useNoteOp = (noteId: number) => {
  const note = useNote(noteId);
  const { left, right, down, move, up, begin, end } = useCursorKeymap();
  const { insertChar, removeChar } = useFocuedLine();
  const pos = useRecoilValue(cursorPos);

  const newLine = () => {
    if (pos == null) return;
    note.newLine(pos.ln, pos.col);
    down(true);
  };

  const remove = () => {
    removeChar(pos.col);
    if (pos.col === 0) {
      // const lines = note.note?.lines ?? [];
      // const prevLine = lines[cursor.pos.ln - 1];
      // move(prevLine.value.length, cursor.pos.ln - 1);
    } else {
      left();
    }
  };

  const insert = (value: string) => {
    insertChar(pos.col, value);
    right(value.length);
  };

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
    move,
  };
};
