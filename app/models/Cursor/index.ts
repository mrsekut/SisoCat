import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import produce from 'immer';
import { useRef } from 'react';
import { decN, sum } from 'app/utils/functions';
import { noteStyle } from 'app/utils/style';
import { Line, noteS, lineInit, useNote } from '../notes';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

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

type CursorFocus = {
  isFocus: true;
  pos: Pos;
  pxPos: PxPos;
  line: Line; // on the cursor
};

type CursorNotFocus = {
  isFocus: false;
  pos?: undefined;
  pxPos?: undefined;
  line?: undefined;
};

type _CursorM = Exclude<CursorFocus, 'line'> | Exclude<CursorNotFocus, 'lien'>;

type CursorM = CursorFocus | CursorNotFocus;

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

const cursorInit: _CursorM = {
  isFocus: false,
};

const _cursorS = atom<_CursorM>({
  key: '_cursorS',
  default: cursorInit,
});

export const cursorS = selector<CursorM>({
  key: 'cursorS',
  get: ({ get }) => {
    const cursor = get(_cursorS);
    if (!cursor.isFocus) {
      return cursor;
    }

    return {
      ...cursor,
      line: get(noteS)?.lines[cursor.pos.ln] ?? lineInit,
    };
  },
  set: ({ set }, newValue) => set(_cursorS, newValue),
});

// DEPRECATED:
export const lineS = selector({
  key: 'lineS',
  get: ({ get }) => {
    const cursor = get(cursorS);
    if (!cursor.isFocus) return lineInit;
    return get(noteS)?.lines[cursor.pos.ln] ?? lineInit;
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
  const note = useNote();
  const { left, right, down } = useCursorKeymap();
  const [cursor] = useRecoilState(cursorS);

  const newLine = () => {
    if (cursor.pos == null) return;
    note.newLine(cursor.pos.ln, cursor.pos.col);
    down(true);
  };

  const remove = () => {
    if (cursor.pos == null) return;
    note.removeChar(cursor.pos.ln, cursor.pos.col);
    left();
  };

  const insert = (value: string) => {
    if (cursor.pos == null) return;
    note.insertChar(cursor.pos.ln, cursor.pos.col, value);
    right(1);
  };

  return {
    note: note.note,
    newLine,
    remove,
    insert,
  };
};

/**
 *
 */

export const useFocus = () => {
  const [, setCursor] = useRecoilState(cursorS);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const line = useRecoilValue(lineS);

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
      line,
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
        const nextLine = note?.lines[ln] ?? lineInit;
        const { col, left } = cursorUpDown(cur.pxPos.left, nextLine.widths);

        c.pos.ln = ln;
        c.pos.col = col;
        c.pxPos.top = decN(cur.pxPos.top, lineHeight);
        c.pxPos.left = left;
      });
    });
  };

  const right = (upperLimit = 0) => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      if (cur.pos.col === textLength + upperLimit) {
        return cur;
      }
      return produce(cur, c => {
        c.pos.col = cur.pos.col + 1;
        c.pxPos.left = cur.pxPos.left + cur.line.widths[cur.pos.col];
      });
    });
  };

  const down = (isNewLine = false) => {
    setCursor(cur => {
      if (!cur.isFocus) return cur;
      return produce(cur, c => {
        const ln = cur.pos.ln + 1;
        const nextLine = note?.lines[ln] ?? lineInit;
        const { col, left } = cursorUpDown(
          cur.pxPos.left,
          nextLine.widths,
          isNewLine,
        );

        c.pos.ln = ln;
        c.pos.col = col;
        c.pxPos.top = cur.pxPos.top + lineHeight;
        c.pxPos.left = left;
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

// cursorを上下に移動した時の、cursorの位置を決定する
export const cursorUpDown = (
  curLeft: number,
  nextLineWidths: number[],
  isNewLine = false,
): { col: number; left: number } => {
  if (isNewLine) {
    return { col: 0, left: 0 };
  }

  if (nextLineWidths.length === 0) {
    return { col: 0, left: 0 };
  }

  const cumSum = nextLineWidths.map(
    (sum => (value: number) => (sum += value))(0),
  );
  const idx = cumSum.findIndex(w => curLeft < w);

  if (idx === -1) {
    return { col: cumSum.length, left: cumSum[cumSum.length - 1] };
  }

  return cumSum[idx] - curLeft <= nextLineWidths[idx] / 2
    ? { col: idx + 1, left: cumSum[idx] }
    : { col: idx, left: cumSum[idx - 1] ?? 0 };
};
