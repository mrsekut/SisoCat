import { act } from '@testing-library/react-hooks';
import { useRecoilValue } from 'recoil';
import { useCursorKeymap, cursorLnS, cursorColS } from '..';
import { renderRecoilHook } from '../../Shared';

const useMock = () => {
  const f = useCursorKeymap();
  const ln = useRecoilValue(cursorLnS);
  const col = useRecoilValue(cursorColS);

  return { f, ln, col };
};

describe('useCursorKeymap', () => {
  it('right/left', () => {
    const { result } = renderRecoilHook(useMock);
    expect(result.current.col).toBe(0);

    act(() => {
      result.current.f.right();
    });
    expect(result.current.col).toBe(1);

    act(() => {
      result.current.f.left();
    });
    expect(result.current.col).toBe(0);
  });

  it('down/up', () => {
    const { result } = renderRecoilHook(useMock);
    expect(result.current.ln).toBe(0);

    act(() => {
      result.current.f.down();
    });
    expect(result.current.ln).toBe(1);

    act(() => {
      result.current.f.up();
    });
    expect(result.current.ln).toBe(0);
  });
});
