import { Note } from '@prisma/client';
import { UserM, NotePM, NoteId } from 'app/models/notes/typings/note';
import { text1, text2, text3, text4, text5, Text } from './texts';

// -------------------------------------------------------------------------------------
// Texts
// -------------------------------------------------------------------------------------

const text2string = (text: string[]) =>
  text.reduce((acc, cur) => `${acc}\n${cur}`, '');

// -------------------------------------------------------------------------------------
// User
// -------------------------------------------------------------------------------------

const user1: UserM = {
  id: 'user1',
  name: 'mrsekut',
};

// -------------------------------------------------------------------------------------
// Dictionay
// -------------------------------------------------------------------------------------

type TempNote = Omit<Note, 'noteId'> & { references: NoteId[] };
const def = {
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};

type Dict = Record<NoteId, TempNote>;

// FIXME: 辞書作成の自動化
// const makeRelDict = (texts: Text[]): RelDict => {};

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

// -------------------------------------------------------------------------------------
// Res Node
// -------------------------------------------------------------------------------------

// // DEPRECATED: これもDictと統一する
// export const note1: Note = {
//   id: 1,
//   title: '[Json]の正規化',
//   lines: text2string(text1),
//   noteId: null,
//   ...def,
// };

// export const note2: Note = {
//   id: 2,
//   title: '[Json]の正規化',
//   lines: text2string(text2),
//   noteId: null,
//   ...def,
// };

// export const note3: Note = {
//   id: 3,
//   title: '自分の命より大切なものをみつけたい',
//   lines: text2string(text3),
//   noteId: null,
//   ...def,
// };

// export const note4: Note = {
//   id: 4,
//   title: '自分の命より大切なものをみつけたい',
//   lines: text2string(text4),
//   noteId: null,
//   ...def,
// };

// export const note5: Note = {
//   id: 5,
//   title: '自分の命より大切なものをみつけたい',
//   lines: text2string(text5),
//   noteId: null,
//   ...def,
// };

// -------------------------------------------------------------------------------------
// Node
// -------------------------------------------------------------------------------------

export const notePM1: NotePM = {
  id: 1,
  author: user1,
  title: '[Json]の正規化',
  createdAt: new Date(),
  updatedAt: new Date(),
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line10',
        lineIndex: 1,
        text: '[Json]の正規化',
        indent: 0,
        nodes: [
          {
            type: 'link',
            value: 'Json',
            references: [2],
          },
          {
            type: 'normal',
            value: 'の正規化',
          },
        ],
      },
    },
    {
      type: 'line',
      line: {
        id: 'line11',
        lineIndex: 2,
        indent: 1,
        text: '\t[json]は[正規化]するのが良い',
        nodes: [
          { type: 'link', value: 'json', references: [] },
          { type: 'normal', value: 'は' },
          { type: 'link', value: '正規化', references: [] },
          { type: 'normal', value: 'するのが良い' },
        ],
      },
    },
    {
      type: 'line',
      line: {
        id: 'line12',
        lineIndex: 3,
        indent: 1,
        text: '\t正規化はよいことばかり',
        nodes: [{ type: 'normal', value: '\t正規化はよいことばかり' }],
      },
    },
    {
      type: 'line',
      line: {
        id: 'line13',
        indent: 1,
        lineIndex: 4,
        text: '\t[CUE]も良い感じらしい',
        nodes: [
          { type: 'link', value: 'CUE', references: [] },
          { type: 'normal', value: 'も良い感じらしい' },
        ],
      },
    },
  ],
  references: [],
};

// 記事: Json
export const notePM2: NotePM = {
  id: 2,
  author: user1,
  title: 'Json',
  createdAt: new Date(),
  updatedAt: new Date(),
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line20',
        text: 'Json',
        lineIndex: 1,
        indent: 1,
        nodes: [{ type: 'normal', value: 'Json' }],
      },
    },
    {
      type: 'line',
      line: {
        id: 'line21',
        lineIndex: 2,
        indent: 2,
        text: '[/ JavaScript Object Notraion]',
        nodes: [{ type: 'italic', value: 'JavaScript Object Notraion' }],
      },
    },
  ],
  references: [],
};

// -------------------------------------------------------------------------------------
// Project
// -------------------------------------------------------------------------------------

// const project: ProjectM = {
//   id: 'project1',
//   name: 'mrsekut-p',
//   author: user1,
//   notes: [1, 2],
// };

// const notes: NotesPM = {
//   byId: {
//     1: notePM1,
//     2: notePM2,
//   },
//   allIds: [1, 2],
// };
