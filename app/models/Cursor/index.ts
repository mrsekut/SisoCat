import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import produce from 'immer';
import { decN, sum } from 'app/components/Reditor/utils/functions';

// px単位のposition
type PxPos = { top: number; left: number };

/**
 * line, column
 * e.g. `hog|ehoge`の時, (0,3)
 */
type Pos = {
  ln: number; // 0始まり、0行目, 1行目,..
  col: number; // 0始まり. 0文字目の左, 1文字目の左,..
};

type CursorM = {
  isFocus: true;
  pos: Pos;
  pxPos: PxPos;
  lineText: string; // Cursorが乗っている行のtext. NOTE: あまり良くないかも知れない(その行が編集された時にここも更新しないといけない)
};
// | {
//     isFocus: false;
//   };

const cursorInit: CursorM = {
  // isFocus: false,

  isFocus: true,
  pos: { ln: 0, col: 0 },
  pxPos: { top: 0, left: 0 },
  lineText: '',
};

export const cursorS = atom<CursorM>({
  key: 'cursorS',
  default: cursorInit,
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

export const useCursor = () => {
  const setCursor = useSetRecoilState(cursorS);

  const setLineText = (text: string) => {
    setCursor(cur => ({ ...cur, lineText: text }));
  };

  return { setLineText };
};

export const useCursorKeymap = () => {
  const [cursor, setCursor] = useRecoilState(cursorS);

  const fontSize = useFontSize('base');
  const font = useFont('mono');

  // FIXME:
  // const lineHeight = useLineHeight('snug');
  const lineHeight = 24;

  console.log(cursor.pos);
  console.log(cursor.pxPos);
  console.log({ lineText: cursor.lineText });

  //  FIXME: useCallback

  /**
   * Keys
   * =====================
   */
  const up = () => {
    setCursor(cur =>
      produce(cur, c => {
        c.pos.ln = decN(cur.pos.ln, 1);
        c.pxPos.top = decN(cur.pxPos.top, lineHeight);
      }),
    );
  };

  const right = () => {
    setCursor(cur => {
      // FIXME: これ、いいのか？
      const textWidths = getTextWidths(cur.lineText, `${fontSize} ${font}`);
      const textLength = cur.lineText.length;
      if (cur.pos.col === textLength) {
        return cur;
      }
      return produce(cur, c => {
        c.pos.col = cur.pos.col + 1;
        c.pxPos.left = cur.pxPos.left + textWidths[cur.pos.col];
      });
    });
  };

  const down = () => {
    setCursor(cur =>
      produce(cur, c => {
        c.pos.ln = cur.pos.ln + 1;
        c.pxPos.top = cur.pxPos.top + lineHeight;
      }),
    );
  };

  const left = () => {
    setCursor(cur => {
      const textWidths = getTextWidths(cur.lineText, `${fontSize} ${font}`);
      return produce(cur, c => {
        c.pos.col = decN(cur.pos.col, 1);
        c.pxPos.left = decN(cur.pxPos.left, textWidths[decN(cur.pos.col, 1)]);
      });
    });
  };

  const begin = () => {
    setCursor(cur =>
      produce(cur, c => {
        c.pos.col = 0;
        c.pxPos.left = 0;
      }),
    );
  };

  const end = () => {
    setCursor(cur =>
      produce(cur, c => {
        c.pos.col = textLength;
        c.pxPos.left = sum(textWidths);
      }),
    );
  };

  return {
    up,
    right,
    down,
    left,

    begin,
    end,
  };
};

/**
 * TODO:
 *  - Focusの判定,CursorMのコメントアウトの解除
 *  - クリックした箇所へ移動
 */

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

// FIXME: indentがある場合の、サイズ調整
export const getTextWidths = (text: string, font: string): number[] => {
  if (typeof window != 'undefined') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context != null) {
      context.font = font;
      return [...text].map(t => context.measureText(t).width);
    }
  }

  return [];
};
