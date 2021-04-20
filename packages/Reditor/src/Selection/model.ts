import { atom, selector, useRecoilCallback } from 'recoil';
import { Ln, Pos, sortBy } from '../Shared';

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
    start: { ln: Ln(0), col: 0 },
    end: { ln: Ln(0), col: 0 },
  },
});

const selectionTextsS = selector({
  key: 'selectionTextsS',
  get: ({ get }) => {
    //
  },
});

const useInSelection = () => {
  const f = useRecoilCallback(
    ({ snapshot }) => async (pos: Pos) => {
      const selection = await snapshot.getPromise(selectionS);
      return inSelection(pos, selection);
    },
    [],
  );

  return { inSelection: f };
};

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

export const inSelection = (pos: Pos, selection: Selection) => {
  const [start, end] = sortPos(selection.start, selection.end);

  const inRange = start.ln <= pos.ln && pos.ln <= end.ln;
  const inStartLine = start.col <= pos.col;
  const inEndLine = pos.col <= end.col;

  return inRange && inStartLine && inEndLine;
};
