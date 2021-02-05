import { noteS, lineInit } from 'app/models/notes';
import { cumSumList, decN } from 'app/utils/functions';
import { noteStyle } from 'app/utils/style';
import produce from 'immer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cursorS, cursorUpDown } from '..';

/**
 * - カーソルの操作, 移動
 */
export const useCursorKeymap = () => {
  const [cursor, setCursor] = useRecoilState(cursorS);
  const note = useRecoilValue(noteS);

  const textLength = cursor.line?.value?.length ?? 0;

  const lineHeight = noteStyle.lineHeight;

  //  FIXME: useCallback

  /**
   * Keys
   * =====================
   */
  const move = (col: number, ln = cursor.pos?.ln ?? 0) => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      const nextLine = note?.lines[ln] ?? lineInit;

      return produce(cur, c => {
        c.pos.ln = ln;
        c.pos.col = col;
        c.pxPos.top = ln * lineHeight;
        c.pxPos.left = col === 0 ? 0 : cumSumList(nextLine.widths)[col - 1];
      });
    });
  };

  const up = () => {
    if (!cursor.isFocus) return;
    const ln = decN(cursor.pos.ln, 1);
    const nextLine = note?.lines[ln] ?? lineInit;
    const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths);

    move(col, ln);
  };

  const right = (upper = 0) => {
    const col = cursor.pos?.col ?? 0;
    if (col === textLength + upper) {
      return;
    }
    // FIXME: use move
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        c.pos.col = cur.pos.col + 1;
        c.pxPos.left = cur.pxPos.left + cur.line.widths[cur.pos.col];
      });
    });
  };

  const down = (isNewLine = false) => {
    if (!cursor.isFocus) return;
    const ln = cursor.pos.ln + 1;
    const nextLine = note?.lines[ln] ?? lineInit;
    const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths, isNewLine);
    move(col, ln);
  };

  const left = () => {
    const col = cursor.pos?.col ?? 0;
    move(decN(col, 1));
  };

  const begin = () => {
    move(0);
  };

  const end = () => {
    move(textLength);
  };

  return { move, up, right, down, left, begin, end };
};
