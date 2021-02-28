import { decN } from 'app/utils/functions';
import produce from 'immer';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { cursorS } from '..';

/**
 * - カーソルの操作, 移動
 */
export const useCursorKeymap = () => {
  const [cursor, setCursor] = useRecoilState(cursorS);
  // const note = useRecoilValue(noteS(cursor.noteId ?? 0)); // FIXME:

  // const textLength = cursor.line?.value?.length ?? 0;

  //  FIXME: useCallback

  /**
   * Keys
   * =====================
   */
  const move = useCallback(
    (col: number, ln = cursor.pos.ln) => {
      // const cum = cumSumList0(cur.line.widths);
      // const isExceedRightmost = col >= cum.length;

      // if (isExceedRightmost) {
      //   const rightMostCol = cur.line.widths.length;
      //   c.pos.col = rightMostCol;
      //   c.pxPos.left = cum[rightMostCol];
      //   return;
      // }
      setCursor(cur => {
        if (!cur.isFocus) return cur;
        return produce(cur, c => {
          c.pos.ln = ln;
          c.pos.col = col;
        });
      });
    },
    [cursor.pos],
  );

  const up = () => {
    console.log('up');
    // if (!cursor.isFocus) return;
    // const ln = decN(cursor.pos.ln, 1);
    // const nextLine = note?.lines[ln] ?? lineInit;
    // const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths);

    // move(col, ln);
  };

  const right = useCallback(
    (n = 1) => {
      const col = cursor.pos.col;
      move(col + n);
    },
    [cursor.pos.col],
  );

  const down = (isNewLine = false) => {
    console.log('down');
    // if (!cursor.isFocus) return;
    // const ln = cursor.pos.ln + 1;
    // const nextLine = note?.lines[ln] ?? lineInit;
    // const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths, isNewLine);
    // move(col, ln);
  };

  const left = useCallback(
    (n = 1) => {
      const col = cursor.pos.col;
      move(decN(col, n));
    },
    [cursor.pos.col],
  );

  const begin = useCallback(() => {
    move(0);
  }, []);

  const end = () => {
    console.log('end');
    // move(textLength);
  };

  return { cursor, move, up, right, down, left, begin, end };
};
