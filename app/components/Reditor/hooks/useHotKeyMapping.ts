import { useHotkeys } from 'react-hotkeys-hook';

type Key = 'up' | 'right' | 'down' | 'left' | 'begin' | 'end' | 'remove';

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
  remove,
}: Args) => {
  /**
   * key mappings
   */
  useHotkeys('up', up);
  useHotkeys('right', right);
  useHotkeys('down', down);
  useHotkeys('left', left);

  useHotkeys('backspace', remove);

  useHotkeys('ctrl+a', begin);
  useHotkeys('ctrl+e', end); // FIXME: 効いていない
};
