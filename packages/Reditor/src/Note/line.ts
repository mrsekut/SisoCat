import {
  atom,
  atomFamily,
  DefaultValue,
  selectorFamily,
  useRecoilCallback,
} from 'recoil';
import { insertNth, range, sliceWithRest } from '../Shared/functions';
import { NoteId } from '.';
import { Branded, Ln } from '../Shared';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

type Line = string;

type LID = Branded<number, 'lid'>;
const LID = (n: number) => n as LID;
const LIDs = (ns: number[]) => ns as LID[];

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

export const noteLineS = atomFamily<Line, { noteId: NoteId; lid: LID }>({
  key: 'noteLineS',
  default: '',
});

export const noteLineByLnS = selectorFamily<Line, { id: NoteId; ln: Ln }>({
  key: 'noteLineByLnS',
  get: ({ id, ln }) => ({ get }) => {
    return get(noteLineS({ noteId: id, lid: get(displayLids(id))[ln] }));
  },
});

export const noteLinesS = selectorFamily<string[], NoteId>({
  key: 'noteLinesS',
  get: noteId => ({ get }) => {
    return get(displayLids(noteId)).map(lid => get(noteLineS({ noteId, lid })));
  },
  set: noteId => ({ get, set }, lines) => {
    if (lines instanceof DefaultValue) return;

    const lid = get(nextLidS);
    lines.map((line, index) =>
      set(noteLineS({ noteId, lid: LID(index + lid) }), line),
    );
    set(nextLidS, id => LID(id + lines.length));
    set(displayLids(noteId), LIDs(range(lid, lid + lines.length - 1)));
  },
});

export const displayLids = atomFamily<LID[], NoteId>({
  key: 'displayLids',
  default: [],
});

const nextLidS = atom<LID>({
  key: 'nextLidS',
  default: LID(0),
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

/**
 * Line Model
 * - Handle the contents of Line
 * - Not involved in UI or Cursor, etc.
 */
export const useLines = (noteId: NoteId) => {
  const _makeId = useRecoilCallback(
    ({ set, snapshot }) => async () => {
      const newId = await snapshot.getPromise(nextLidS);
      set(nextLidS, LID(newId + 1));
      return newId;
    },
    [],
  );

  const updateLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: Ln, value: string) => {
      const ids = await snapshot.getPromise(displayLids(noteId));
      set(noteLineS({ noteId, lid: ids[ln] }), value);
    },
    [],
  );

  const newLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: Ln, col: number) => {
      const lines = await snapshot.getPromise(noteLinesS(noteId));
      const line = lines[ln];
      const [half, rest] = sliceWithRest(line, col);

      const ids = await snapshot.getPromise(displayLids(noteId));
      const lineId = await _makeId();

      set(noteLineS({ noteId, lid: ids[ln] }), half);
      set(noteLineS({ noteId, lid: lineId }), rest);
      set(displayLids(noteId), ids => insertNth(ids, ln + 1, lineId));
    },
    [],
  );

  const removeLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: Ln) => {
      if (ln === 0) return;

      const lines = await snapshot.getPromise(noteLinesS(noteId));
      const preLine = lines[ln - 1];
      const curLine = lines[ln];
      const ids = await snapshot.getPromise(displayLids(noteId));
      set(noteLineS({ noteId, lid: ids[ln - 1] }), preLine + curLine);
      set(displayLids(noteId), ids => ids.filter(id => id !== ids[ln]));
    },
    [],
  );

  return { updateLine, newLine, removeLine };
};
