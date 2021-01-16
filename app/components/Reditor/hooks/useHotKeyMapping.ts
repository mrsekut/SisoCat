import { useHotkeys } from 'react-hotkeys-hook';

type Key = 'up' | 'right' | 'down' | 'left' | 'begin' | 'end' | 'remove';

export type DepsHotkey = {
  fn: () => void;
  deps: any[];
};

type Args = {
  [key in Key]: DepsHotkey;
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
  useHotkeys('up', up.fn, {}, [...up.deps]);
  useHotkeys('right', right.fn, {}, [...right.deps]);
  useHotkeys('down', down.fn, {}, [...down.deps]);
  useHotkeys('left', left.fn, {}, [...left.deps]);

  useHotkeys('backspace', remove.fn, {}, [...remove.deps]);

  useHotkeys('ctrl+a', begin.fn, {}, [...begin.deps]);
  useHotkeys('ctrl+e', end.fn, {}, [...end.deps]); // FIXME: 効いていない
};
