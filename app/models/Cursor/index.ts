import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import produce from 'immer';
import { Line, noteS, useNote } from '../Note';
import { useRef } from 'react';
import { decN, sum } from 'app/utils/functions';
import { noteStyle } from 'app/utils/style';

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
      line: Line; // on the cursor
    }
  | {
      isFocus: false;
      pos?: undefined;
      pxPos?: undefined;
      line?: undefined;
    };

const cursorInit: CursorM = {
  isFocus: false,
};

export const cursorS = atom<CursorM>({
  key: 'cursorS',
  default: cursorInit,
});

export const lineS = selector({
  key: 'lineS',
  get: ({ get }) => {
    const cursor = get(cursorS);
    if (!cursor.isFocus) return undefined;
    return get(noteS)?.lines[cursor.pos.ln];
  },
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

/**
 *
 */

export const useFocus = () => {
  const [, setCursor] = useRecoilState(cursorS);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const line = useRecoilValue(lineS)?.value ?? '';
  const { textWidths } = useTextWidths();

  const calcCoordinate = (
    x: number,
    y: number,
  ): { ln: number; col: number } => {
    // FIXME: col
    return {
      ln: Math.floor(y / noteStyle.lineHeight),
      col: 0,
    };
  };

  // initialize cusror
  const onFocus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ref.current?.focus();
    const pos = calcCoordinate(e.clientX, e.clientY);

    setCursor({
      isFocus: true,
      pos,
      pxPos: {
        top: pos.ln * noteStyle.lineHeight,
        left: 0, // FIXME:
      },
      line: { value: line, widths: textWidths(line) },
    });
  };

  return { ref, onFocus };
};

/**
 * - カーソルの操作, 移動
 */
export const useCursorKeymap = () => {
  const [cursor, setCursor] = useRecoilState(cursorS);
  const note = useRecoilValue(noteS);
  const { textWidths } = useTextWidths();

  const textLength = cursor.line?.value?.length ?? 0;

  const lineHeight = noteStyle.lineHeight;

  //  FIXME: useCallback

  /**
   * Keys
   * =====================
   */
  const up = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;

      return produce(cur, c => {
        const ln = decN(cur.pos.ln, 1);
        const line = note?.lines[ln].value ?? '';

        c.pos.ln = ln;
        c.pxPos.top = decN(cur.pxPos.top, lineHeight); // FIXME:
        c.line = { value: line, widths: textWidths(line) };
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
        c.pxPos.left = cur.pxPos.left + cur.line.widths[cur.pos.col];
      });
    });
  };

  const down = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        const ln = cur.pos.ln + 1;
        const line = note?.lines[ln].value ?? '';

        c.pos.ln = ln;
        c.pxPos.top = cur.pxPos.top + lineHeight; // FIXME:
        c.line = { value: line, widths: textWidths(line) };
      });
    });
  };

  const left = () => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        c.pos.col = decN(cur.pos.col, 1);
        c.pxPos.left = decN(
          cur.pxPos.left,
          cur.line.widths[decN(cur.pos.col, 1)],
        );
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
        c.pxPos.left = sum(cur.line.widths);
      });
    });
  };

  return { up, right, down, left, begin, end };
};

/**
 *
 */
export const useTextWidths = () => {
  const fontSize = useFontSize('base');
  const font = useFont('mono');
  const textWidths = (line: string) =>
    getTextWidths(line ?? '', `${fontSize} ${font}`);
  return { textWidths };
};

// -------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------

// FIXME: indentがある場合の、サイズ調整
export const getTextWidths = (text: string, font: string): number[] => {
  if (window != null) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context != null) {
      context.font = font;
      return [...text].map(t => context.measureText(t).width);
    }
  }

  return [];
};
