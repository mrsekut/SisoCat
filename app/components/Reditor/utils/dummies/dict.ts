import { Dict, text2string } from './dummy';
import { text1, text2, text3, text4, text5 } from './texts';

// FIXME: move
export const def = {
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};

// DEPRECATED:
export const relDict: Dict = {
  1: {
    ...def,
    id: 1,
    title: text1[0],
    references: [6, 7, 8],
    lines: text2string(text1),
  },
  2: {
    ...def,
    id: 2,
    title: text2[0],
    references: [],
    lines: text2string(text2),
  },
  3: {
    ...def,
    id: 3,
    title: text3[0],
    references: [],
    lines: text2string(text3),
  },
  4: {
    ...def,
    id: 4,
    title: text4[0],
    references: [],
    lines: text2string(text4),
  },
  5: {
    ...def,
    id: 5,
    title: text5[0],
    references: [],
    lines: text2string(text5),
  },
  6: {
    ...def,
    id: 6,
    title: 'Json',
    references: [],
    lines: '',
  },
  7: {
    ...def,
    id: 7,
    title: 'CUE',
    references: [],
    lines: '',
  },
  8: {
    ...def,
    id: 8,
    title: '正規化',
    references: [],
    lines: '',
  },
};
