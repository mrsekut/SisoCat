import { NoteId, UserM, Line } from './note';

export type NoteInfo = {
  readonly id: NoteId;
  readonly author: UserM;
  readonly title: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly references: NoteId[];
};

export type NoteM = NoteInfo & {
  readonly lines: Line[];
};
