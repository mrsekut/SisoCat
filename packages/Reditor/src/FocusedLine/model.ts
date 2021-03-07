import { atom, useRecoilCallback } from 'recoil';
import { deleteNthChar, insertNthChar } from '../Shared/functions';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

type Char = string;

export const focuedLineS = atom({
  key: 'focuedLineS',
  default: '',
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
