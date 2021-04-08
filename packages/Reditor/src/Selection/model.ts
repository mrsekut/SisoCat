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
