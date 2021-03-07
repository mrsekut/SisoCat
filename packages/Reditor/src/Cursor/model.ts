import { atom, DefaultValue, selector, useRecoilCallback } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import { decN } from '../Shared/functions';
import { Pos } from '../Shared/typings';
import { getTextWidths } from '../Shared/util';

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

export const cursorLn = atom({
  key: 'cursorLn',
  default: 0,
});

export const cursorCol = atom({
  key: 'cursorCol',
  default: 0,
});

export const cursorPos = selector<Pos>({
  key: 'cursorPos',
  get: ({ get }) => ({
    ln: get(cursorLn),
    col: get(cursorCol),
  }),
  set: ({ set }, pos) => {
    if (pos instanceof DefaultValue) return;
    set(cursorLn, pos.ln);
    set(cursorCol, pos.col);
  },
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
      set(cursorLn, ln => decN(ln, 1));
    },
    [],
  );

  const right = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorCol, col => col + n);
    },
    [],
  );

  const down = useRecoilCallback(
    ({ set }) => () => {
      set(cursorLn, ln => ln + 1);
    },
    [],
  );

  const left = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorCol, col => decN(col, n));
    },
    [],
  );

  const move = useRecoilCallback(
    ({ set }) => (col: number) => {
      set(cursorCol, col);
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
