import { atom, selector } from 'recoil';
import { Pos, sortBy } from '../Shared';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

type Selection = {
  start: Pos;
  end: Pos;
};

const selectionS = atom<Selection>({
  key: 'selectionS',
  default: {
    start: { ln: 0, col: 0 },
    end: { ln: 0, col: 0 },
  },
});

const selectionTextsS = selector({
  key: 'selectionTextsS',
  get: ({ get }) => {
    //
  },
});

export const getSelectedLines = (
  pos1: Pos,
  pos2: Pos,
  lines: string[],
): string[] => {
  const [start, end] = sortPos(pos1, pos2);

  if (start.ln === end.ln) {
    return [lines[start.ln].slice(start.col, end.col)];
  }

  const startLine = lines[start.ln].slice(start.col);
  const middleLines = lines.slice(start.ln + 1, end.ln);
  const endLine = lines[end.ln].slice(0, end.col);

  return [startLine, ...middleLines, endLine];
};

export const sortPos = (pos1: Pos, pos2: Pos): [Pos, Pos] => {
  if (pos1.ln === pos2.ln) {
    return [pos1, pos2].sort(sortBy(p => p.col)) as [Pos, Pos];
  }

  return [pos1, pos2].sort(sortBy(p => p.ln)) as [Pos, Pos];
};
