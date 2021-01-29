import { atom, useRecoilState } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import produce from 'immer';
import { decN, sum } from 'app/components/Reditor/utils/functions';
import { useNote } from '../Note';
import { MutableRefObject, useRef } from 'react';

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

type CursorM =
  | {
      isFocus: true;
      pos: Pos;
      pxPos: PxPos;
      lineText: string; // Cursorが乗っている行のtext. NOTE: あまり良くないかも知れない(その行が編集された時にここも更新しないといけない)
    }
  | {
      isFocus: false;
      pos?: undefined;
      pxPos?: undefined;
      lineText?: undefined;
    };

const cursorInit: CursorM = {
  isFocus: false,
};

export const cursorS = atom<CursorM>({
  key: 'cursorS',
  default: cursorInit,
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

/**
 * useCursorKeymapとuseNoteの接続
 * e.g. カーソル位置の文字削除、文字入力
 */
export const useNoteOp = () => {
  const { note, removeChar, insertChar } = useNote();
  const { left, right } = useCursorKeymap();
  const [cursor] = useRecoilState(cursorS);

  const remove = () => {
    if (cursor.pos == null) return;
    removeChar(cursor.pos.ln, cursor.pos.col);
    left();
  };

  const insert = (value: string) => {
    if (cursor.pos == null) return;
    insertChar(cursor.pos.ln, cursor.pos.col, value);
    right();
  };

  return { note, remove, insert };
};

export const useFocus = (): [
  MutableRefObject<HTMLTextAreaElement | null>,
  () => void,
] => {
  const [, setCursor] = useRecoilState(cursorS);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const onFocus = () => {
    ref.current?.focus();
    // FIXME: pos
    setCursor({
      isFocus: true,
      pos: { ln: 0, col: 0 },
      pxPos: { top: 0, left: 0 },
      lineText: '',
    });
  };

  return [ref, onFocus];
};

/**
 * ノートの内容には依存しないカーソルの操作, 移動
 */
export const useCursorKeymap = () => {
  const [cursor, setCursor] = useRecoilState(cursorS);

  const fontSize = useFontSize('base');
  const font = useFont('mono');

  const textWidths = getTextWidths(
    cursor.lineText ?? '',
    `${fontSize} ${font}`,
  );
  const textLength = cursor.lineText?.length ?? 0;

  // FIXME:
  // const lineHeight = useLineHeight('snug');
  const lineHeight = 24;

  //  FIXME: useCallback

  /**
   * Keys
   * =====================
   */
  const up = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        c.pos.ln = decN(cur.pos.ln, 1);
        c.pxPos.top = decN(cur.pxPos.top, lineHeight);
      });
    });
  };

  const right = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
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
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        c.pos.ln = cur.pos.ln + 1;
        c.pxPos.top = cur.pxPos.top + lineHeight;
      });
    });
  };

  const left = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        c.pos.col = decN(cur.pos.col, 1);
        c.pxPos.left = decN(cur.pxPos.left, textWidths[decN(cur.pos.col, 1)]);
      });
    });
  };

  const begin = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        c.pos.col = 0;
        c.pxPos.left = 0;
      });
    });
  };

  const end = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        c.pos.col = textLength;
        c.pxPos.left = sum(textWidths);
      });
    });
  };

  return { up, right, down, left, begin, end };
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
