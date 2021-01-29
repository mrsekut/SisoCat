type Key =
  | 'up'
  | 'right'
  | 'down'
  | 'left'
  | 'begin'
  | 'end'
  | 'insert'
  | 'remove';

type Args = Record<Key, (v?: any) => void>;

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
          begin();
          break;
        case 'e':
          // FIXME: 効いていない
          end();
          break;
        default:
          break;
      }
      return;
    }

    if (e.altKey) {
      return;
    }

    switch (key) {
      case 'ArrowUp':
        up();
        break;
      case 'ArrowRight':
        right();
        break;
      case 'ArrowDown':
        down();
        break;
      case 'ArrowLeft':
        left();
        break;

      case 'Backspace':
        remove();
        break;
      default:
        insert(key);
        break;
    }

    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  };

  return { keyMapping };
};
