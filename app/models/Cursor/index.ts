import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import { useRef } from 'react';
import { cumSumList, range } from 'app/utils/functions';
import { noteStyle } from 'app/utils/style';
import { noteS, lineInit, useNote } from '../notes';
import { Line } from '../notes/typings/note';
import { textWithIndents } from 'app/components/Reditor/utils/parsers/parser';
import { textStyle } from 'app/components/Reditor/utils/settings';
import { useCursorKeymap } from './hooks/useCursorKeymap';

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
  const { left, right, down, move } = useCursorKeymap();
  const [cursor] = useRecoilState(cursorS);

  const newLine = () => {
    if (cursor.pos == null) return;
    note.newLine(cursor.pos.ln, cursor.pos.col);
    down(true);
  };

  const remove = () => {
    if (cursor.pos == null) return;
    note.removeChar(cursor.pos.ln, cursor.pos.col);
    if (cursor.pos.col === 0) {
      const lines = note.note?.lines ?? [];
      const prevLine = lines[cursor.pos.ln - 1];
      move(prevLine.value.length, cursor.pos.ln - 1);
    } else {
      left();
    }
  };

  const insert = (value: string) => {
    if (cursor.pos == null) return;
    note.insertChar(cursor.pos.ln, cursor.pos.col, value);
    right(value.length);
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

export const getTextWidths = (text: string, font: string): number[] => {
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context != null) {
      const { value, level } = textWithIndents.tryParse(text);
      context.font = font;

      const indents = range(level).map(_ => textStyle.fontSize);
      const widths = [...value].map(t => context.measureText(t).width);
      return indents.concat(widths);
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

  const csl = cumSumList(nextLineWidths);
  const idx = csl.findIndex(w => curLeft < w);

  if (idx === -1) {
    return { col: csl.length, left: csl[csl.length - 1] };
  }

  return csl[idx] - curLeft <= nextLineWidths[idx] / 2
    ? { col: idx + 1, left: csl[idx] }
    : { col: idx, left: csl[idx - 1] ?? 0 };
};
