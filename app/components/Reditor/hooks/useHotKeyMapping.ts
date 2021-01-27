type Key =
  | 'up'
  | 'right'
  | 'down'
  | 'left'
  | 'begin'
  | 'end'
  | 'insert'
  | 'remove';

export type DepsHotkey = {
  fn: (v?: any) => void; // FIXME: type
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
  insert,
  remove,
}: Args) => {
  const keyMapping = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.nativeEvent.key;

    if (e.ctrlKey) {
      switch (key) {
        case 'a':
          begin.fn();
          break;
        case 'e':
          // FIXME: 効いていない
          end.fn();
          break;
        default:
          break;
      }
      return;
    }

    if (e.altKey) {
      return;
    }

    if (e.shiftKey) {
      return;
    }

    switch (key) {
      case 'ArrowUp':
        up.fn();
        break;
      case 'ArrowRight':
        right.fn();
        break;
      case 'ArrowDown':
        down.fn();
        break;
      case 'ArrowLeft':
        left.fn();
        break;

      case 'Backspace':
        remove.fn();
        break;
      default:
        insert.fn(key);
        break;
    }

    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  };

  return { keyMapping };
};
