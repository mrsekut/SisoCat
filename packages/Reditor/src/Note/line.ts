import {
  atom,
  atomFamily,
  DefaultValue,
  selectorFamily,
  useRecoilCallback,
} from 'recoil';
import { insertNth, range, sliceWithRest } from '../Shared/functions';
import { noteS, NoteId } from '.';

type LineId = number;
type Ln = number;
type Line = string;

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

export const noteLineS = atomFamily<Line, { noteId: NoteId; lineId: LineId }>({
  key: 'noteLineS',
  default: '',
});

export const noteLineByLnS = selectorFamily<Line, { id: NoteId; ln: Ln }>({
  key: 'noteLineByLnS',
  get: ({ id, ln }) => ({ get }) => {
    return get(noteLineS({ noteId: id, lineId: get(lineIdsS(id))[ln] }));
  },
});

export const noteLinesS = selectorFamily<string[], NoteId>({
  key: 'noteLinesS',
  get: noteId => ({ get }) => {
    return get(lineIdsS(noteId)).map(lineId =>
      get(noteLineS({ noteId, lineId })),
    );
  },
  set: noteId => ({ get, set }, lines) => {
    if (lines instanceof DefaultValue) return;

    const lineId = get(nextLineIdS);
    lines.map((line, index) =>
      set(noteLineS({ noteId, lineId: index + lineId }), line),
    );
    set(nextLineIdS, id => id + lines.length);
    set(lineIdsS(noteId), range(lineId, lineId + lines.length - 1));
  },
});

export const lineIdsS = atomFamily<LineId[], NoteId>({
  key: 'lineIdsS',
  default: [],
});

const nextLineIdS = atom<LineId>({
  key: 'latestLineIdS',
  default: 0,
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
      const newId = await snapshot.getPromise(nextLineIdS);
      set(nextLineIdS, newId + 1);
      return newId;
    },
    [],
  );

  const updateLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: Ln, value: string) => {
      const ids = await snapshot.getPromise(lineIdsS(noteId));
      set(noteLineS({ noteId, lineId: ids[ln] }), value);
    },
    [],
  );

  const newLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: number, col: number) => {
      const note = await snapshot.getPromise(noteS(noteId));
      const line = note.lines[ln];
      const [half, rest] = sliceWithRest(line, col);

      const ids = await snapshot.getPromise(lineIdsS(noteId));
      const lineId = await _makeId();

      set(noteLineS({ noteId, lineId: ids[ln] }), half);
      set(noteLineS({ noteId, lineId: lineId }), rest);
      set(lineIdsS(noteId), ids => insertNth(ids, ln + 1, lineId));
    },
    [],
  );

  // FIXME: interfaceおかしくない？
  const removeLine = useRecoilCallback(
    ({ set }) => async (ln: number, focuedLine: string) => {
      if (ln === 0) return;

      // FIXME: note全体を更新しているが、本来は2行の更新のみでいい
      set(noteLinesS(noteId), lines => [
        ...lines.slice(0, ln - 1),
        lines[ln - 1] + focuedLine,
        ...lines.slice(ln + 1),
      ]);

      // set(lineIds(noteId), ids => ids.filter(id => id !== ln));
    },
    [],
  );

  return { updateLine, newLine, removeLine };
};
