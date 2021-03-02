import { atom, selector, useRecoilCallback } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import { Line } from '../notes/typings/note';
import { getTextWidths } from './utils';
import { Pos } from 'app/components/Reditor/utils/types';
import { decN } from 'app/utils/functions';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

// px単位のposition
type PxPos = { top: number; left: number };

// FIXME:
type CursorFocus = {
  isFocus: true;
  pos: Pos;
  pxPos: PxPos;
  noteId: number;
  line: Line; // on the cursor
};

// FIXME:
type CursorNotFocus = {
  isFocus: false;
  pos?: undefined;
  pxPos?: undefined;
  noteId?: undefined;
  line?: undefined;
};

type _CursorM = Exclude<CursorFocus, 'line'> | Exclude<CursorNotFocus, 'lien'>;

type CursorM = CursorFocus | CursorNotFocus;

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

const cursorFocus = atom({
  key: 'cursorFocus',
  default: false,
});

export const cursorPos = atom({
  key: 'cursorPos',
  default: { ln: 0, col: 0 },
});

export const cursorS = selector({
  key: 'cursorS',
  get: ({ get }) => ({
    isFocus: get(cursorFocus),
    pos: get(cursorPos),
  }),
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------
/**
 * - カーソルの操作, 移動
 */
export const useCursorKeymap = () => {
  // const [cursor, setCursor] = useRecoilState(cursorS);
  // const note = useRecoilValue(noteS(cursor.noteId ?? 0)); // FIXME:

  // const textLength = cursor.line?.value?.length ?? 0;

  // FIXME: moveを使用する(意味があるなら)

  /**
   * Keys
   * =====================
   */
  const move = useRecoilCallback(
    ({ set }) => (col: number, ln?: number) => {
      // const cum = cumSumList0(cur.line.widths);
      // const isExceedRightmost = col >= cum.length;

      // if (isExceedRightmost) {
      //   const rightMostCol = cur.line.widths.length;
      //   c.pos.col = rightMostCol;
      //   c.pxPos.left = cum[rightMostCol];
      //   return;
      // }
      set(cursorPos, pos => ({ ln: ln ?? pos.ln, col }));
    },
    [],
  );

  const up = () => {
    console.log('up');
    // if (!cursor.isFocus) return;
    // const ln = decN(cursor.pos.ln, 1);
    // const nextLine = note?.lines[ln] ?? lineInit;
    // const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths);

    // move(col, ln);
  };

  const right = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorPos, pos => ({ ...pos, col: pos.col + n }));
    },
    [],
  );

  const down = (isNewLine = false) => {
    console.log('down');
    // if (!cursor.isFocus) return;
    // const ln = cursor.pos.ln + 1;
    // const nextLine = note?.lines[ln] ?? lineInit;
    // const { col } = cursorUpDown(cursor.pxPos.left, nextLine.widths, isNewLine);
    // move(col, ln);
  };

  const left = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorPos, pos => ({ ...pos, col: decN(pos.col, n) }));
    },
    [],
  );

  const begin = useRecoilCallback(
    ({ set }) => () => {
      set(cursorPos, pos => ({ ...pos, col: 0 }));
    },
    [],
  );

  const end = () => {
    // FIXME: selecotrを使ってendを取得すればいい
    console.log('end');
    // move(textLength);
  };

  return { move, up, right, down, left, begin, end };
};

/**
 *
 */

export const useFocus = () => {
  const focus = useRecoilCallback(
    ({ set }) => (pos: Pos) => {
      set(cursorFocus, true);
      set(cursorPos, pos);
    },
    [],
  );

  return { focus };
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
