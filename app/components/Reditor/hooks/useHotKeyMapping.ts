import { useHotkeys } from 'react-hotkeys-hook';

type Key = 'up' | 'right' | 'down' | 'left' | 'begin' | 'end';
type KeyWithDeps = 'remove';

export type DepsHotkey = {
  fn: () => void;
  deps: any[];
};

type Args = {
  [key in Key]: () => void;
};

type WithDeps = {
  [key in KeyWithDeps]: DepsHotkey;
};

export const useHotKeyMapping = (
  { up, right, down, left, begin, end }: Args,
  { remove }: WithDeps,
) => {
  /**
   * key mappings
   */
  useHotkeys('up', up);
  useHotkeys('right', right);
  useHotkeys('down', down);
  useHotkeys('left', left);

  useHotkeys('backspace', remove.fn, {}, [...remove.deps]);

  useHotkeys('ctrl+a', begin);
  useHotkeys('ctrl+e', end); // FIXME: 効いていない
};
