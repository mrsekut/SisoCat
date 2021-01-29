type Key = 'up' | 'right' | 'down' | 'left' | 'begin' | 'end' | 'remove';

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
}: Args) => {
  const keyMapping = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.nativeEvent.key;
    const cmd = command(e);

    if (cmd('z')) {
      console.log('undo');
      return;
    }

    if (key.length == 1) {
      return;
    }

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
        break;
    }

    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  };

  return { keyMapping };
};
