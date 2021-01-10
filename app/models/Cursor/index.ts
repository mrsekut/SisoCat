import { atom, useRecoilState } from 'recoil';
import { useHotkeys } from 'react-hotkeys-hook';
import { textStyle } from 'app/components/Reditor/utils/settings';
import { useFont, useFontSize } from '@xstyled/styled-components';

const decN = (n1: number, n2: number) => Math.max(n1 - n2, 0);

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
  lineText: string; // Cursorが乗っている行のtext
};
// | {
//     isFocus: false;
//   };

const cursorInit: CursorM = {
  // isFocus: false,

  isFocus: true,
  pos: { ln: 0, col: 0 },
  pxPos: { top: 0, left: 0 },
  lineText: '[TypeScript]は、 [/ すごい]です',
};

export const cursorS = atom<CursorM>({
  key: 'cursorS',
  default: cursorInit,
});

// PxPosをPosに変換する(非公開)

// Posのみに着眼する(PxPosのことは知らない)(公開)
export const useCursor = () => {
  const [cursor, setCursor] = useRecoilState(cursorS);
  const font = useFont('mono');
  const fontSize = useFontSize('base');
  const f = `${fontSize} ${font}`;
  const textWidths = getTextWidths(cursor.lineText, f);
  const length = cursor.lineText.length;

  // TODO: いったん具体的に書いて、できそうなら一般化して切り出す
  const up = () =>
    setCursor(cur => ({
      ...cur,
      pos: { ...cur.pos, ln: decN(cur.pos.ln, 1) },
      pxPos: { ...cur.pxPos, top: decN(cur.pxPos.top, textStyle.lineHeight) },
    }));

  const right = () =>
    setCursor(cur => {
      if (cur.pos.col === length) {
        return cur;
      }

      return {
        ...cur,
        pos: { ...cur.pos, col: cur.pos.col + 1 },
        pxPos: {
          ...cur.pxPos,
          left: cur.pxPos.left + textWidths[cur.pos.col],
        },
      };
    });

  const down = () =>
    setCursor(cur => ({
      ...cur,
      pos: { ...cur.pos, ln: cur.pos.ln + 1 },
      pxPos: { ...cur.pxPos, top: cur.pxPos.top + textStyle.lineHeight },
    }));

  const left = () =>
    setCursor(cur => ({
      ...cur,
      pos: { ...cur.pos, col: decN(cur.pos.col, 1) },
      pxPos: {
        ...cur.pxPos,
        left: decN(cur.pxPos.left, textWidths[decN(cur.pos.col, 1)]),
      },
    }));

  /**
   * key mappings
   */
  useHotkeys('up', up);
  useHotkeys('right', right);
  useHotkeys('down', down);
  useHotkeys('left', left);

  // return { cursor };
};

/**
 * TODO:
 *  - クリックした箇所へ移動
 *  - Focusの判定
 *  - Focusした際にその行の文章を取得してstateを更新
 * 	- Normalのfontsizeはglobalに定義しておく
 */

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

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
