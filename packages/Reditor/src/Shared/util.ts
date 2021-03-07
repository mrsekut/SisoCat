import { range, cumSumList } from './functions';
import { textWithIndents } from './utils/parsers/parser';
import { textStyle } from './utils/settings';

export const getTextWidths = (text: string, font: string): number[] => {
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context != null) {
      const { value, level } = textWithIndents.tryParse(text);
      context.font = font;

      const indents = range(level).map(_ => textStyle.fontSize);
      const widths = [...value].map(t => context.measureText(t).width);
      return indents.concat(widths);
    }
  }

  return [];
};

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
