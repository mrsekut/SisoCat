import { useRecoilCallback } from 'recoil';
import { Pos } from '../Shared/typings';
import { cursorPosS, cursorFocusS } from './model';

/**
 *
 */
export const useFocus = () => {
  const focus = useRecoilCallback(
    ({ set }) => (pos: Pos) => {
      set(cursorFocusS, true);
      set(cursorPosS, pos);
    },
    [],
  );

  return { focus };
};
