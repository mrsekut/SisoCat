import { useRecoilCallback } from 'recoil';
import { Pos } from '../Shared/typings';
import { cursorPos, cursorFocus } from './model';

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
