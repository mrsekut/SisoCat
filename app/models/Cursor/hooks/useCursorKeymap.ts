import { noteS, lineInit } from 'app/models/notes';
import { cumSumList0, decN } from 'app/utils/functions';
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

      return produce(cur, c => {
        const cum = cumSumList0(cur.line.widths);
        const isExceedRightmost = col >= cum.length;

        if (isExceedRightmost) {
          const rightMostCol = cur.line.widths.length;
          c.pos.col = rightMostCol;
          c.pxPos.left = cum[rightMostCol];
          return;
        }

        c.pos.ln = ln;
        c.pos.col = col;
        c.pxPos.top = ln * lineHeight;
        c.pxPos.left = cum[col];
      });
    });
  };

  const up = () => {
    if (!cursor.isFocus) return;
    const ln = decN(cursor.pos.ln, 1);
    const nextLine = note?.blocks[cursor.blcokIdx].lines[ln] ?? lineInit; // FIXME: block跨いだ時
    const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths);

    move(col, ln);
  };

  const right = (n = 1) => {
    const col = cursor.pos?.col ?? 0;
    move(col + n);
  };

  const down = (isNewLine = false) => {
    if (!cursor.isFocus) return;
    const ln = cursor.pos.ln + 1;
    const nextLine = note?.blocks[cursor.blcokIdx].lines[ln] ?? lineInit; // FIXME: block跨いだ時
    const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths, isNewLine);
    move(col, ln);
  };

  const left = (n = 1) => {
    const col = cursor.pos?.col ?? 0;
    move(decN(col, n));
  };

  const begin = () => {
    move(0);
  };

  const end = () => {
    move(textLength);
  };

  return { cursor, move, up, right, down, left, begin, end };
};
