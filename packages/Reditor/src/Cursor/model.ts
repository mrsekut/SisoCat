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

export const cursorFocus = atom({
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
