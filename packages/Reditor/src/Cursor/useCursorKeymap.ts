import { useRecoilCallback } from 'recoil';
import { decN } from '../Shared/functions';
import { cursorLn, cursorCol } from './model';

/**
 * Cursor operation and movement
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
