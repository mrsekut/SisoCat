import { NoteId, UserM } from './note';

export type NoteInfo = {
  readonly id: NoteId;
  readonly author: UserM;
  readonly title: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly references: NoteId[];
};

export type NoteM = NoteInfo & {
  readonly blocks: BlockM[];
};

export type BlockM = NoteInfo & {
  readonly lines: Line[];
};

export type Line = {
  value: string;
  widths: number[];
};
