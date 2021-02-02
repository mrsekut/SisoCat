type Key =
  | 'up'
  | 'right'
  | 'down'
  | 'left'
  | 'begin'
  | 'end'
  | 'remove'
  | 'newLine';

type Args = Record<Key, (v?: any) => void>;

const isMacOS = () => navigator.userAgent.indexOf('Mac OS X') > -1;

const command = (e: React.KeyboardEvent<HTMLTextAreaElement>) => (
  key: string,
) =>
  (!isMacOS() ? e.ctrlKey && !e.metaKey : e.metaKey && !e.ctrlKey) &&
  e.key == key &&
  !e.altKey &&
  !e.shiftKey;

export const useHotKeyMapping = ({
  up,
  right,
  down,
  left,
  begin,
  end,
  remove,
  newLine,
}: Args) => {
  const keyMapping = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.nativeEvent.key;
    const cmd = command(e);

    if (cmd('z')) {
      console.log('undo');
      return;
    }

    if (e.ctrlKey) {
      switch (key) {
        case 'a':
          begin();
          break;
        case 'e':
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
      case 'Enter':
        newLine();
        break;
      default:
        break;
    }

    if (key.length == 1) {
      return;
    }

    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  };

  return { keyMapping };
};
