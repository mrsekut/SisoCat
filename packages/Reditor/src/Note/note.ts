import { atomFamily, DefaultValue, selectorFamily } from 'recoil';
import { NoteId, noteLinesS } from '.';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

type Note = {
  noteId: NoteId;
  lines: string[];
};

export const noteIdS = atomFamily<NoteId, NoteId>({
  key: 'noteIdS',
  default: n => n,
});

export const noteS = selectorFamily<Note, NoteId>({
  key: 'noteS',
  get: id => ({ get }) => ({
    noteId: get(noteIdS(id)),
    lines: get(noteLinesS(id)),
  }),
  set: id => ({ set }, note) => {
    if (note instanceof DefaultValue) return;

    set(noteIdS(id), note.noteId);
    set(noteLinesS(id), note.lines);
  },
});
