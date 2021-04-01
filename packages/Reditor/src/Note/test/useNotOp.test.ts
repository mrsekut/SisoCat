import { act } from '@testing-library/react-hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Ln, renderRecoilHook } from '../../Shared';
import { cursorPosS } from '../../Cursor';
import { noteLinesS, useNoteOp } from '..';
import { focuedLineS } from '../../FocusedLine';

const useMock = () => {
  const noteId = 0;

  const focuedLine = useRecoilValue(focuedLineS);
  const [lines, setLines] = useRecoilState(noteLinesS(noteId));
  const u = useNoteOp(noteId);
  const [pos, setPos] = useRecoilState(cursorPosS);

  return { pos, setPos, u, lines, setLines, focuedLine };
};

describe('useNoteOp', () => {
  it('newLine', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc']);
      result.current.setPos({ ln: Ln(0), col: 2 }); // ab|c
    });

    await act(async () => {
      result.current.u.newLine();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 1, col: 0 });
    expect(result.current.lines).toStrictEqual(['ab', 'c']);
    expect(result.current.focuedLine).toBe('c');
  });

  it('newLine in multiple lines', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['aaa', 'bbb', 'ccc']);
      result.current.setPos({ ln: Ln(1), col: 2 }); // bb|b
    });

    await act(async () => {
      result.current.u.newLine();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 2, col: 0 });
    expect(result.current.lines).toStrictEqual(['aaa', 'bb', 'b', 'ccc']);
    expect(result.current.focuedLine).toBe('b');
  });

  it('remove', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['a', 'def']);
      result.current.setPos({ ln: Ln(1), col: 1 }); // d|ef
    });

    await act(async () => {
      result.current.u.remove();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 1, col: 0 });
    expect(result.current.lines).toStrictEqual(['a', 'ef']);

    await act(async () => {
      result.current.u.remove();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 0, col: 1 });
    expect(result.current.lines).toStrictEqual(['aef']);
  });

  it('insert', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc']);
      result.current.setPos({ ln: Ln(0), col: 2 }); // ab|c
    });

    await act(async () => {
      result.current.u.insert('X');
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 0, col: 3 });
    expect(result.current.lines).toStrictEqual(['abXc']);
  });

  it('up', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc', 'def']);
      result.current.setPos({ ln: Ln(1), col: 1 }); // d|ef
    });

    await act(async () => {
      result.current.u.up();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 0, col: 1 });
  });

  it('right', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc', 'def']);
      result.current.setPos({ ln: Ln(0), col: 2 }); // ab|c
    });

    await act(async () => {
      result.current.u.right();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 0, col: 3 });

    await act(async () => {
      result.current.u.right();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 1, col: 0 });
  });

  it('down', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc', 'def']);
      result.current.setPos({ ln: Ln(0), col: 1 }); // a|bc
    });

    await act(async () => {
      result.current.u.down();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 1, col: 1 });

    // FIXME: testがtimeoutする
    // await act(async () => {
    //   result.current.u.down();
    //   await waitForNextUpdate();
    // });
    // expect(result.current.pos).toMatchObject({ ln: 1, col: 1 });

    /**
     * NOTE: 異常系
     * - 上の方が長いとき
     */
  });

  it('left', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc', 'def']);
      result.current.setPos({ ln: Ln(1), col: 1 }); // d|ef
    });

    await act(async () => {
      result.current.u.left();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 1, col: 0 });

    // await act(async () => {
    //   result.current.u.right();
    //   await waitForNextUpdate();
    // });
    // expect(result.current.pos).toMatchObject({ ln: 0, col: 3 });
  });

  it('begin', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc']);
      result.current.setPos({ ln: Ln(0), col: 2 });
    });

    await act(async () => {
      result.current.u.begin();
      await waitForNextUpdate();
    });
    expect(result.current.pos.col).toEqual(0);
  });

  it('end', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abc']);
      result.current.setPos({ ln: Ln(0), col: 0 });
    });

    await act(async () => {
      result.current.u.end();
      await waitForNextUpdate();
    });
    expect(result.current.pos.col).toEqual(3);
  });
});

describe('new line', () => {
  it('insert value and enter', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['aaaaa', 'bbbbb', 'ccccc']);
      result.current.setPos({ ln: Ln(1), col: 2 }); // bb|bbb
    });

    await act(async () => {
      result.current.u.insert('XXX');
      await waitForNextUpdate();
    });
    await act(async () => {
      result.current.u.newLine();
      await waitForNextUpdate();
    });
    expect(result.current.pos).toMatchObject({ ln: 2, col: 0 });
    expect(result.current.focuedLine).toBe('bbb');
    expect(result.current.lines).toStrictEqual([
      'aaaaa',
      'bbXXX',
      'bbb',
      'ccccc',
    ]);
  });
});
