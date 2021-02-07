import {
  BlockPM,
  NotePM,
  NotesPM,
  ProjectM,
  UserM,
} from 'app/models/notes/typings/note';

// -------------------------------------------------------------------------------------
// User
// -------------------------------------------------------------------------------------

const user1: UserM = {
  id: 'user1',
  name: 'mrsekut',
};

// -------------------------------------------------------------------------------------
// Block
// -------------------------------------------------------------------------------------

const block1: BlockPM = {
  id: 1,
  author: user1,
  title: '[Json]の正規化',
  createdAt: new Date(),
  updatedAt: new Date(),
  references: [],
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line10',
        lineIndex: 1,
        text: '[Json]の正規化',
        indent: 0,
        nodes: [
          { type: 'link', value: 'Json', references: [2] },
          { type: 'normal', value: 'の正規化' },
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
  ],
};

const block2: BlockPM = {
  id: 2,
  author: user1,
  title: '[CUE]も良い感じらしい',
  createdAt: new Date(),
  updatedAt: new Date(),
  references: [],
  nodes: [
    {
      type: 'line',
      line: {
        id: 'line13',
        indent: 0,
        lineIndex: 4,
        text: '[CUE]も良い感じらしい',
        nodes: [
          { type: 'link', value: 'CUE', references: [] },
          { type: 'normal', value: 'も良い感じらしい' },
        ],
      },
    },
  ],
};

const block3: BlockPM = {
  id: 3,
  author: user1,
  title: '[Json]の正規化',
  createdAt: new Date(),
  updatedAt: new Date(),
  references: [],
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
};

// -------------------------------------------------------------------------------------
// Node
// -------------------------------------------------------------------------------------

export const note1: NotePM = {
  id: 1,
  author: user1,
  title: '[Json]の正規化',
  createdAt: new Date(),
  updatedAt: new Date(),
  blocks: [block1, block2],
  references: [],
};

// 記事: Json
export const note2: NotePM = {
  id: 2,
  author: user1,
  title: 'Json',
  createdAt: new Date(),
  updatedAt: new Date(),
  blocks: [block3],
  references: [],
};

// -------------------------------------------------------------------------------------
// Project
// -------------------------------------------------------------------------------------

const project: ProjectM = {
  id: 'project1',
  name: 'mrsekut-p',
  author: user1,
  notes: [1, 2],
};

export const notes: NotesPM = {
  byId: {
    1: note1,
    2: note2,
  },
  allIds: [1, 2],
};
