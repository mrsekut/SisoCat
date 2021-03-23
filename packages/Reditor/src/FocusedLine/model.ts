import { selector, useRecoilCallback } from 'recoil';
import { cursorLnS } from '../Cursor';
import { noteLineS } from '../Note';
import { deleteNthChar, insertNthChar } from '../Shared/functions';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

export const focuedLineS = selector<string>({
  key: 'focuedLineS',
  get: ({ get }) => {
    return get(
      noteLineS({
        noteId: 0, // FIXME:
        lineId: get(cursorLnS),
      }),
    );
  },
  set: ({ set, get }, value) => {
    set(
      noteLineS({
        noteId: 0, // FIXME:
        lineId: get(cursorLnS),
      }),
      value,
    );
  },
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

export const useFocuedLine = () => {
  const insertValue = useRecoilCallback(
    ({ set }) => (col: number, value: string) => {
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

  return { insertValue, removeChar };
};
