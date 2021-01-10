import { useHotkeys } from 'react-hotkeys-hook';

type Key = 'up' | 'right' | 'down' | 'left' | 'begin' | 'end';

type Args = {
  [key in Key]: () => void;
};

export const useHotKeyMapping = ({
  up,
  right,
  down,
  left,
  begin,
  end,
}: Args) => {
  /**
   * key mappings
   */
  useHotkeys('up', up);
  useHotkeys('right', right);
  useHotkeys('down', down);
  useHotkeys('left', left);

  useHotkeys('ctrl+a', begin);
  useHotkeys('ctrl+e', end); // FIXME: 効いていない
};
