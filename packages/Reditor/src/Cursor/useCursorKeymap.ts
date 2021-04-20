import { useRecoilCallback } from 'recoil';
import { Ln } from '../Shared';
import { decN } from '../Shared/functions';
import { cursorLnS, cursorColS } from './model';

/**
 * Cursor operation and movement
 */
export const useCursorKeymap = () => {
  const up = useRecoilCallback(
    ({ set }) => () => {
      set(cursorLnS, ln => Ln(decN(ln, 1)));
    },
    [],
  );

  const right = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorColS, col => col + n);
    },
    [],
  );

  const down = useRecoilCallback(
    ({ set }) => () => {
      set(cursorLnS, ln => Ln(ln + 1));
    },
    [],
  );

  const left = useRecoilCallback(
    ({ set }) => (n: number = 1) => {
      set(cursorColS, col => decN(col, n));
    },
    [],
  );

  const move = useRecoilCallback(
    ({ set }) => (col: number) => {
      set(cursorColS, col);
    },
    [],
  );

  return { up, right, down, left, move };
};
