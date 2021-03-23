import { act } from '@testing-library/react-hooks';
import { useRecoilState } from 'recoil';
import { focuedLineS, useFocuedLine } from '..';
import { renderRecoilHook } from '../../Shared';

const useMock = () => {
  const f = useFocuedLine();
  const [focuedLine, setFocuedLine] = useRecoilState(focuedLineS);

  return { f, focuedLine, setFocuedLine };
};

describe('useFocuedLine', () => {
  it('insert one character at the nth in the line', () => {
    const { result } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setFocuedLine('abcde');
    });

    act(() => {
      result.current.f.insertValue(0, 'X');
    });
    expect(result.current.focuedLine).toBe('Xabcde');

    act(() => {
      result.current.f.insertValue(3, 'Y');
    });
    expect(result.current.focuedLine).toBe('XabYcde');

    act(() => {
      result.current.f.insertValue(3, 'あいう');
    });
    expect(result.current.focuedLine).toBe('XabあいうYcde');
  });

  it('remove one character at the nth in the line', () => {
    const { result } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setFocuedLine('abcde');
    });

    act(() => {
      result.current.f.removeChar(0);
    });
    expect(result.current.focuedLine).toBe('abcde');

    act(() => {
      result.current.f.removeChar(1);
    });
    expect(result.current.focuedLine).toBe('bcde');

    act(() => {
      result.current.f.removeChar(3);
    });
    expect(result.current.focuedLine).toBe('bce');
  });
});
