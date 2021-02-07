import { NoteInfo } from 'app/models/notes/typings';
import { UserM } from 'app/models/notes/typings/note';

const user1: UserM = {
  id: 'user1',
  name: 'mrsekut',
};

// -------------------------------------------------------------------------------------
// Response Block
// -------------------------------------------------------------------------------------

// FIXME: use prisma type
type ResBlockM = NoteInfo & {
  readonly lines: string;
};

const block1: ResBlockM = {
  id: 1,
  author: user1,
  title: '[Json]の正規化',
  createdAt: new Date(),
  updatedAt: new Date(),
  references: [],
  lines:
    '[Json]の正規化\n\
\t[json]は[正規化]するのが良い\n\
\t正規化は[** よいこと]ばかり\n',
};

const block2: ResBlockM = {
  id: 2,
  author: user1,
  title: '[CUE]も良い感じらしい',
  createdAt: new Date(),
  updatedAt: new Date(),
  references: [],
  lines: '[CUE]も良い感じらしい\n\
\tすごいすごい\n',
};

// -------------------------------------------------------------------------------------
// Response Note
// -------------------------------------------------------------------------------------

// DEPRECATED: use prisma type
type PrismaNote = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  blocks: ResBlockM[];
  // blocks: number[];
  noteId: number | null;
  userId: number;
};

// FIXME: type
export const note0: PrismaNote = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  title: '自分の命より大切なものを見つけたい',
  blocks: [block1, block2],
  noteId: null,
  userId: 1,
};
