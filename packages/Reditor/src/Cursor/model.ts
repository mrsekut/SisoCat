import { atom, DefaultValue, selector } from 'recoil';
import { Pos } from '../Shared/typings';

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

export const cursorFocusS = atom({
  key: 'cursorFocusS',
  default: false,
});

export const cursorLnS = atom({
  key: 'cursorLnS',
  default: 0,
});

export const cursorColS = atom({
  key: 'cursorColS',
  default: 0,
});

export const cursorPosS = selector<Pos>({
  key: 'cursorPosS',
  get: ({ get }) => ({
    ln: get(cursorLnS),
    col: get(cursorColS),
  }),
  set: ({ set }, pos) => {
    if (pos instanceof DefaultValue) return;
    set(cursorLnS, pos.ln);
    set(cursorColS, pos.col);
  },
});

export const cursorS = selector<CursorM>({
  key: 'cursorS',
  get: ({ get }) =>
    get(cursorFocusS)
      ? {
          isFocus: true,
          pos: get(cursorPosS),
        }
      : { isFocus: false },
});
