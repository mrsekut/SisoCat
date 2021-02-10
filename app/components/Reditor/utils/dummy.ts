import { Note } from '@prisma/client';
import { UserM, NotePM } from 'app/models/notes/typings/note';

// -------------------------------------------------------------------------------------
// Texts
// -------------------------------------------------------------------------------------

const text1 = [
  ['[Json]の正規化'],
  ['\t[json]は[正規化]するのが良い'],
  ['\t正規化は[** よいこと]ばかり'],
  ['[CUE]も良い感じらしい'],
];

const text2 = [
  ['他者に[依存]しない '],
  [],
  ['人間の[依存]をどう定義するか'],
  ['　「依存」の言葉の定義が曖昧すぎる'],
  ['　情報は他者に依存しまくっている'],
  ['　依存の中にも好むものと好まないものがある'],
  ['　うまく言語化できていないが、超利己的なものであることはわかる'],
  [],
  ['直感的に許容している依存'],
  ['	他人が他人のために作ったライブラリ等の使用'],
  ['	他人が他人のために書いた記事の閲覧'],
  ['	[他人の自発的な行動による利益]の享受を許容しているのだな'],
  ['	国というシステム  '],
  ['		公共機関とか、学習機関とか'],
  ['		本当はここも壊さないといけない'],
  ['			思考を放棄しているので国のような弱者救済装置に頼ってしまっている'],
  ['			国の存在が前提にある'],
  ['			「でも日本に頼ってるじゃん」と言われるとぐうの音も出ない'],
  [
    '			極論、島を作って独りで生きていけるようなシステムを構築しなければ、依存は解決されない',
  ],
];

const text2string = (text: string[][]) =>
  text.reduce((acc, cur) => `${acc}\n${cur}`, '');

// -------------------------------------------------------------------------------------
// User
// -------------------------------------------------------------------------------------

const user1: UserM = {
  id: 'user1',
  name: 'mrsekut',
};

// -------------------------------------------------------------------------------------
// Res Node
// -------------------------------------------------------------------------------------

export const note1: Note = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: '[Json]の正規化',
  lines: text2string(text1),
  noteId: null,
  userId: 1,
};

export const note2: Note = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: '[Json]の正規化',
  lines: text2string(text2),
  noteId: null,
  userId: 1,
};

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
