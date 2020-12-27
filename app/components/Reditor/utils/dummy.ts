import { UserM, LineNodeM, NoteM, ProjectM, NotesM } from './types';

/**
 * User
 * =====================
 */
const user1: UserM = {
  id: 'user1',
  name: 'mrsekut',
};

/**
 * Note
 * =====================
 */

// 記事: [Json]の正規化
export const title1: LineNodeM = {
  type: 'line',
  line: {
    id: 'line10',
    text: '[Json]の正規化',
    indent: 0,
    nodes: [
      {
        type: 'link',
        value: 'Json',
        references: ['note2'],
      },
      {
        type: 'normal',
        value: 'の正規化',
      },
    ],
  },
};

export const note1: NoteM = {
  id: 'note1',
  author: user1,
  title: title1,
  created: 1608260148,
  updated: 1608260148,
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line11',
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
        text: '\t[CUE]も良い感じらしい',
        nodes: [
          { type: 'link', value: 'CUE', references: [] },
          { type: 'normal', value: 'も良い感じらしい' },
        ],
      },
    },
  ],
  references: [],
  referenced: [],
};

// 記事: Json
const title2: LineNodeM = {
  type: 'line',
  line: {
    id: 'line20',
    text: 'Json',
    indent: 1,
    nodes: [{ type: 'normal', value: 'Json' }],
  },
};

export const note2: NoteM = {
  id: 'note2',
  author: user1,
  title: title2,
  created: 1608260148,
  updated: 1608260148,
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line21',
        indent: 1,
        text: '[/ JavaScript Object Notraion]',
        nodes: [{ type: 'italic', value: 'JavaScript Object Notraion' }],
      },
    },
  ],
  references: [],
  referenced: [],
};

/**
 * Project
 * =====================
 */
const project: ProjectM = {
  id: 'project1',
  name: 'mrsekut-p',
  author: user1,
  notes: ['note1', 'note2'],
};

export const notes: NotesM = {
  byId: {
    note1: note1,
    note2: note2,
  },
  allIds: ['note1', 'note2'],
};
