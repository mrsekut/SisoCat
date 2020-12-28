import { useState, useCallback } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { textStyle } from '../utils/settings';

const decN = (n1: number, n2: number) => Math.max(n1 - n2, 0);

export type CursorPos = {
  top: number;
  left: number;
  lineIndex: number;
};

/**
 * TODO:
 * - Recoilを使う
 * - その行の文字数を超えてRightができてはいけない
 * - 文字の幅を取得する
 */

export const useCursor = () => {
  const [pos, setPos] = useState<CursorPos>({ top: 0, left: 0, lineIndex: 0 });

  const up = useCallback(
    () =>
      setPos(pos => ({
        ...pos,
        top: decN(pos.top, textStyle.lineHeight),
        lineIndex: decN(pos.lineIndex, 1),
      })),
    [],
  );
  const right = useCallback(
    () => setPos(pos => ({ ...pos, left: pos.left + textStyle.fontSize })),
    [],
  );
  const down = useCallback(
    () =>
      setPos(pos => ({
        ...pos,
        top: pos.top + textStyle.lineHeight,
        lineIndex: pos.lineIndex + 1,
      })),
    [],
  );
  const left = useCallback(
    () => setPos(pos => ({ ...pos, left: decN(pos.left, textStyle.fontSize) })),
    [],
  );

  /**
   * key mappings
   */
  useHotkeys('up', up);
  useHotkeys('right', right);
  useHotkeys('down', down);
  useHotkeys('left', left);

  return { position: pos };
};
