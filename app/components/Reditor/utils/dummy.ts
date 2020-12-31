import { UserM, NoteM, ProjectM, NotesM } from './types';

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

export const note1: NoteM = {
  id: 'note1',
  author: user1,
  title: '[Json]の正規化',
  created: 1608260148,
  updated: 1608260148,
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line10',
        lineIndex: 1,
        // text: '[Json]の正規化',
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
    },
    {
      type: 'line',
      line: {
        id: 'line11',
        lineIndex: 2,
        indent: 1,
        // text: '\t[json]は[正規化]するのが良い',
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
        // text: '\t正規化はよいことばかり',
        nodes: [{ type: 'normal', value: '\t正規化はよいことばかり' }],
      },
    },
    {
      type: 'line',
      line: {
        id: 'line13',
        indent: 1,
        lineIndex: 4,
        // text: '\t[CUE]も良い感じらしい',
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
export const note2: NoteM = {
  id: 'note2',
  author: user1,
  title: 'Json',
  created: 1608260148,
  updated: 1608260148,
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line20',
        // text: 'Json',
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
        // text: '[/ JavaScript Object Notraion]',
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
