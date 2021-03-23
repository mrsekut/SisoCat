import { act } from '@testing-library/react-hooks';
import { useRecoilState, useRecoilValue } from 'recoil';
import { renderRecoilHook } from '../../Shared';
import { lineIdsS, noteLinesS, useLines } from '..';

const useMock = () => {
  const noteId = 0;

  const lineIds = useRecoilValue(lineIdsS(noteId));
  const f = useLines(noteId);
  const [lines, setLines] = useRecoilState(noteLinesS(noteId));

  return { f, lines, setLines, lineIds };
};

describe('useLines', () => {
  it('setLines', () => {
    const { result } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abcdefgh', 'ijklmno']);
    });
    expect(result.current.lines).toStrictEqual(['abcdefgh', 'ijklmno']);
    expect(result.current.lineIds).toStrictEqual([0, 1]);
  });

  it('updateLine', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['abcdefgh', 'ijklmno']);
    });

    await act(async () => {
      result.current.f.updateLine(0, 'hogehoge');
      await waitForNextUpdate();
    });
    expect(result.current.lines).toStrictEqual(['hogehoge', 'ijklmno']);

    /**
     * NOTE: 異常系
     * - 3行のlinesに対し、5行目に追加
     * - -1行目に追加
     */
  });

  it('newLine', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useMock);

    // initialize
    act(() => {
      result.current.setLines(['aaaaaa', 'dddeee', 'cccccc']);
    });

    await act(async () => {
      result.current.f.newLine(1, 3);
      await waitForNextUpdate();
    });
    expect(result.current.lines).toStrictEqual([
      'aaaaaa',
      'ddd',
      'eee',
      'cccccc',
    ]);
    expect(result.current.lineIds).toStrictEqual([0, 1, 3, 2]);

    /**
     * NOTE: 異常系
     * 存在しない行での改行
     */
  });
});
