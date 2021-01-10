import { useHotkeys } from 'react-hotkeys-hook';

type Key = 'up' | 'right' | 'down' | 'left';

type Args = {
  [key in Key]: () => void;
};

export const useHotKeyMapping = ({ up, right, down, left }: Args) => {
  /**
   * key mappings
   */
  useHotkeys('up', up);
  useHotkeys('right', right);
  useHotkeys('down', down);
  useHotkeys('left', left);
};
