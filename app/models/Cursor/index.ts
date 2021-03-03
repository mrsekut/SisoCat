import { atom, selector, useRecoilCallback } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import { getTextWidths } from './utils';
import { Pos } from 'app/components/Reditor/utils/types';
import { decN } from 'app/utils/functions';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

type CursorFocus = {
  isFocus: true;
  pos: Pos;
};

type CursorNotFocus = {
  isFocus: false;
  pos?: undefined;
};

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

export const cursorS = selector<CursorM>({
  key: 'cursorS',
  get: ({ get }) =>
    get(cursorFocus)
      ? {
          isFocus: true,
          pos: get(cursorPos),
        }
      : { isFocus: false },
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------
/**
 * - Cursor operation and movement
 */
export const useCursorKeymap = () => {
  const up = useRecoilCallback(
    ({ set }) => () => {
      set(cursorPos, pos => ({ ...pos, ln: decN(pos.ln, 1) }));
    },
    [],
  );

  const right = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorPos, pos => ({ ...pos, col: pos.col + n }));
    },
    [],
  );

  const down = useRecoilCallback(
    ({ set }) => () => {
      set(cursorPos, pos => ({ ...pos, ln: pos.ln + 1 }));
    },
    [],
  );

  const left = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorPos, pos => ({ ...pos, col: decN(pos.col, n) }));
    },
    [],
  );

  const move = useRecoilCallback(
    ({ set }) => (col: number) => {
      set(cursorPos, pos => ({ ...pos, col }));
    },
    [],
  );

  return { up, right, down, left, move };
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
