import { selector, useRecoilCallback } from 'recoil';
import { cursorLn } from '../Cursor';
import { noteLine } from '../Note';
import { deleteNthChar, insertNthChar } from '../Shared/functions';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

type Char = string;

export const focuedLineS = selector<string>({
  key: 'focuedLineS',
  get: ({ get }) => {
    return get(
      noteLine({
        noteId: 0, // FIXME:
        lineId: get(cursorLn),
      }),
    );
  },
  set: ({ set, get }, value) => {
    set(
      noteLine({
        noteId: 0, // FIXME:
        lineId: get(cursorLn),
      }),
      value,
    );
  },
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

export const useFocuedLine = () => {
  const insertChar = useRecoilCallback(
    ({ set }) => (col: number, value: Char) => {
      set(focuedLineS, line => insertNthChar(line, col, value));
    },
    [],
  );

  const removeChar = useRecoilCallback(
    ({ set }) => (col: number) => {
      if (col === 0) {
        return;
      }
      set(focuedLineS, line => deleteNthChar(line, col - 1));
    },
    [],
  );

  return { insertChar, removeChar };
};
