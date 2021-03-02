import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import produce from 'immer';
import {
  deleteNthChar,
  insertNthChar,
  range,
  sliceWithRest,
} from 'app/utils/functions';
import { useTextWidths } from '../Cursor';
import { NoteInfo, NoteM } from './typings';
import { Line, NoteId } from './typings/note';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

const noteId = atomFamily({
  key: 'noteId',
  default: (id: number) => id,
});

const noteAuthor = atomFamily({
  key: 'noteAuthor',
  default: { id: 0, name: 'mrsekut' },
});

const noteTitle = atomFamily({
  key: 'noteTitle',
  default: '',
});

const noteCreateAt = atomFamily({
  key: 'noteCreateAt',
  default: new Date(),
});

const noteUpdatedAt = atomFamily({
  key: 'noteUpdatedAt',
  default: new Date(),
});

// FIXME: line atom
const noteLines = atomFamily<string[], NoteId>({
  key: 'noteLines',
  default: [],
});

const noteRefs = atomFamily<number[], NoteId>({
  key: 'noteRefs',
  default: [],
});

type A = NoteInfo & { lines: string[] };
export const noteS = selectorFamily<{ lines: string[] }, NoteId>({
  // export const noteS = selectorFamily({
  key: 'noteS',
  get: (id: number) => ({ get }) => ({
    // id: get(noteId(id)),
    // author: get(noteAuthor(id)),
    // title: get(noteTitle(id)),
    // createdAt: get(noteCreateAt(id)),
    // updatedAt: get(noteUpdatedAt(id)),
    // references: get(noteRefs(id)),
    lines: get(noteLines(id)),
  }),
  set: noteId => ({ get, set }, n) => {
    set(noteLines(noteId), n.lines);
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
  const note = useRecoilValue(noteS(noteId));
  console.log({ note });

  const { textWidths } = useTextWidths();

  const updateLine = useRecoilCallback(
    ({ set }) => (ln: number, line: string) => {
      set(noteLines(noteId), lines => {
        return produce(lines, l => {
          l[ln] = line;
          // l[ln] = { value: line, widths: textWidths(line) };
        });
      });
    },
    [],
  );

  const newLine = (ln: number, col: number) => {
    // const line = note?.lines[ln].value ?? '';
    // const [half, rest] = sliceWithRest(line, col);
    // setNote(note => {
    //   if (note == null) return note;
    //   return produce(note, n => {
    //     n.lines = n.lines
    //       .slice(0, ln)
    //       .concat([{ value: half, widths: textWidths(half) }])
    //       .concat([{ value: rest, widths: textWidths(rest) }])
    //       .concat(n.lines.slice(ln + 1));
    //   });
    // });
  };

  const removeLine = (ln: number) => {
    // setNote(note => {
    //   if (note == null) return note;
    //   return produce(note, n => {
    //     const l1 = note.lines[ln - 1];
    //     const l2 = note.lines[ln];
    //     n.lines = note.lines
    //       .slice(0, ln - 1)
    //       .concat([mergeLine(l1, l2)])
    //       .concat(note.lines.slice(ln + 1));
    //   });
    // });
  };

  return { newLine };
};

const mergeLine = (l1: Line, l2: Line): Line => {
  return {
    value: l1.value.concat(l2.value),
    widths: l1.widths.concat(l2.widths),
  };
};
