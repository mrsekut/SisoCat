import { Note } from '@prisma/client';
import { NoteId, LinkN } from '../../../Note/note';
import { uniqBy } from '../../functions';
import { lineParser } from '../parsers/parser';

// -------------------------------------------------------------------------------------
// Texts
// -------------------------------------------------------------------------------------

const text2string = (text: string[]) =>
  text.reduce((acc, cur) => `${acc}\n${cur}`, '');

// -------------------------------------------------------------------------------------
// Dictionay
// -------------------------------------------------------------------------------------
export type Text = string[];

type TempNote = Omit<Note, 'noteId'> & { references: NoteId[] };

type Dict = Record<NoteId, TempNote>;
type RDict = Record<string, TempNote>;

const def = {
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};

const linkMap = (text: string) => {
  return lineParser(text, 0 as any, 0)
    .tryParse(text)
    .nodes.filter(t => t.type === 'link') as LinkN[];
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

const makeRDict = (dict: Dict): RDict =>
  Object.values(dict).reduce(
    (acc: RDict, cur: TempNote) => ({ ...acc, [cur.title]: cur }),
    {},
  );

const toDict = (dict: Dict, text: Text): Dict => {
  const links = uniqBy(text.flatMap(linkMap), l => l.value);

  return links.reduce(
    (accDict, link) => arr2dict(accDict, searchOrCreate(accDict, link.value)),
    dict,
  );
};

const makeReferences = (note: TempNote, rdict: RDict) => {
  const getIds = uniqBy(linkMap(note.lines).map(l => l.value)).map(
    l => rdict[l].id,
  );

  return {
    ...note,
    references: getIds,
  };
};

export const makeRelDict = (texts: Text[]): Dict => {
  // make by texts
  const dict = texts
    .map((text, id) => ({
      ...def,
      id,
      title: text[0],
      references: [],
      lines: text2string(text),
    }))
    .reduce(arr2dict, {});

  // make by links
  const addedData = texts.reduce(
    (accDict, text) => toDict(accDict, text),
    dict,
  );

  // make refferences
  return Object.values(addedData).map(b =>
    makeReferences(b, makeRDict(addedData)),
  );
};
