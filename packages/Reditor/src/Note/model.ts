import {
  atomFamily,
  DefaultValue,
  selectorFamily,
  useRecoilCallback,
} from 'recoil';
import produce from 'immer';
import { sliceWithRest } from '../Shared/functions';
import { NoteId } from './note';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

type N = {
  noteId: NoteId;
  lines: string[];
};

const noteId = atomFamily({
  key: 'noteId',
  default: 0,
});

// FIXME: line atom
const noteLines = atomFamily<string[], NoteId>({
  key: 'noteLines',
  default: [],
});

export const noteS = selectorFamily<N, NoteId>({
  key: 'noteS',
  get: (id: number) => ({ get }) => ({
    noteId: get(noteId(id)),
    lines: get(noteLines(id)),
  }),
  set: id => ({ set }, note) => {
    if (note instanceof DefaultValue) return;

    set(noteId(id), note.noteId);
    set(noteLines(id), note.lines);
  },
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

/**
 * Note's Model
 *
 * - ノートの内容の操作
 * - UIには関与しない
 */
export const useNote = (noteId: number) => {
  const updateLine = useRecoilCallback(
    ({ set }) => (ln: number, line: string) => {
      set(noteLines(noteId), lines =>
        produce(lines, l => {
          l[ln] = line;
        }),
      );
    },
    [],
  );

  const newLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: number, col: number) => {
      const note = await snapshot.getPromise(noteS(noteId));
      const line = note.lines[ln];
      const [half, rest] = sliceWithRest(line, col);
      set(noteS(noteId), note => {
        return produce(note, n => {
          n.lines = [
            ...n.lines.slice(0, ln),
            half,
            rest,
            ...n.lines.slice(ln + 1),
          ];
        });
      });
    },
    [],
  );

  const removeLine = useRecoilCallback(
    ({ set }) => async (ln: number, focuedLine: string) => {
      set(noteS(noteId), note => {
        return produce(note, n => {
          n.lines = [
            ...n.lines.slice(0, ln - 1),
            n.lines[ln - 1] + focuedLine,
            ...note.lines.slice(ln + 1),
          ];
        });
      });
    },
    [],
  );

  return { updateLine, newLine, removeLine };
};
