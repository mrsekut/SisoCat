import { act } from '@testing-library/react-hooks';
import { useRecoilValue } from 'recoil';
import { renderRecoilHook } from '../Shared';
import { cursorColS, cursorLnS, useCursorKeymap } from '../Cursor';

// FIXME: move
const useMock = () => {
  const fs = useCursorKeymap();
  const ln = useRecoilValue(cursorLnS);
  const col = useRecoilValue(cursorColS);

  return { ...fs, ln, col };
};

// FIXME: move
describe('useLines', () => {
  it('right/left', () => {
    const { result } = renderRecoilHook(useMock);
    expect(result.current.col).toBe(0);

    act(() => {
      result.current.right();
    });
    expect(result.current.col).toBe(1);

    act(() => {
      result.current.left();
    });
    expect(result.current.col).toBe(0);
  });
});
