import { Note } from '@prisma/client';
import { UserM, NotePM, NoteId, LinkN } from 'app/models/notes/typings/note';
import { uniqBy } from 'app/utils/functions';
import { lineParser } from '../parsers/parser';
import { def } from './dict';

// -------------------------------------------------------------------------------------
// Texts
// -------------------------------------------------------------------------------------

export const text2string = (text: string[]) =>
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
export type Text = string[];

type TempNote = Omit<Note, 'noteId'> & { references: NoteId[] };

export type Dict = Record<NoteId, TempNote>;

const linkMap = (text: Text) => {
  return text
    .map(t => lineParser(t, 0 as any, 0).tryParse(t))
    .flatMap(t => t.nodes)
    .filter(t => t.type === 'link') as LinkN[];
};

const searchOrCreate = (dict: Dict, title: string): TempNote => {
  const searched = Object.values(dict).find(v => v.title === title);
  if (searched == null) {
    return {
      ...def,
      id: Object.keys(dict).length,
      title,
      references: [],
      lines: '',
    };
  }
  return searched;
};

const arr2dict = (acc: Dict, cur: TempNote) => ({ ...acc, [cur.id]: cur });

const toDict = (dict: Dict, text: Text): Dict => {
  return uniqBy(linkMap(text), l => l.value).reduce(
    (accDict, link) => arr2dict(accDict, searchOrCreate(accDict, link.value)),
    dict,
  );
};

export const makeRelDict = (texts: Text[]): Dict => {
  const dict = texts
    .map((text, id) => ({
      ...def,
      id,
      title: text[0],
      references: [],
      lines: text2string(text),
    }))
    .reduce(arr2dict, {});

  return texts.reduce((accDict, text) => toDict(accDict, text), dict);
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
