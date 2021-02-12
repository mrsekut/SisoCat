import { act, renderHook } from '@testing-library/react-hooks';
import { cursorS, cursorUpDown } from 'app/models/Cursor';
import React, { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useCursorKeymap } from '../hooks/useCursorKeymap';

describe('useCursorKeymap', () => {
  const TestComponent: React.FC = ({ children }) => {
    const setCursor = useSetRecoilState(cursorS);
    useEffect(() => {
      setCursor({
        isFocus: true,
        noteId: 1,
        pos: { ln: 0, col: 0 },
        pxPos: {
          top: 0,
          left: 0,
        },
        line: { value: 'あいうえお', widths: [16, 16, 16, 16, 16] },
      });
    }, []);

    return <>{children}</>;
  };

  const { result } = renderHook(useCursorKeymap, {
    wrapper: ({ children }) => (
      <RecoilRoot>
        <TestComponent>{children}</TestComponent>
      </RecoilRoot>
    ),
  });

  it('move', () => {
    expect(result.current.cursor.pos).toMatchObject({
      ln: 0,
      col: 0,
    });

    act(() => {
      result.current.move(1, 1);
    });

    expect(result.current.cursor.pos).toMatchObject({
      ln: 1,
      col: 1,
    });
  });
});

describe('cursorUpDown', () => {
  it('10 or 20', () => {
    const curLeft = 18;
    const widths = [10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 2, left: 20 });
  });

  it('0 or 10', () => {
    const curLeft = 9;
    const widths = [10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 1, left: 10 });
  });

  it('rounding: 20 or 30', () => {
    const curLeft = 25;
    const widths = [10, 10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 3, left: 30 });
  });

  it('0 or 10', () => {
    const curLeft = 3;
    const widths = [10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 0, left: 0 });
  });

  it('If the upper limit is exceeded, move to the end', () => {
    const curLeft = 45;
    const widths = [10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 2, left: 20 });
  });

  it('FIXME:', () => {
    const curLeft = 0;
    const widths = [10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 0, left: 0 });
  });

  it('FIXME:', () => {
    const curLeft = 50;
    const widths = [10, 10];
    expect(cursorUpDown(curLeft, widths, true)).toMatchObject({
      col: 0,
      left: 0,
    });
  });

  it('FIXME:', () => {
    const curLeft = 10;
    const widths: number[] = [];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 0, left: 0 });
  });
});
