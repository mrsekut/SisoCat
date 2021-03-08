import { cumSumList } from './functions';

// cursorを上下に移動した時の、cursorの位置を決定する
export const cursorUpDown = (
  curLeft: number,
  nextLineWidths: number[],
  isNewLine = false,
): { col: number; left: number } => {
  if (isNewLine) {
    return { col: 0, left: 0 };
  }

  if (nextLineWidths.length === 0) {
    return { col: 0, left: 0 };
  }

  const csl = cumSumList(nextLineWidths);
  const idx = csl.findIndex(w => curLeft < w);

  if (idx === -1) {
    return { col: csl.length, left: csl[csl.length - 1] };
  }

  return csl[idx] - curLeft <= nextLineWidths[idx] / 2
    ? { col: idx + 1, left: csl[idx] }
    : { col: idx, left: csl[idx - 1] ?? 0 };
};
