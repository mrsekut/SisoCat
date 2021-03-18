import {
  atom,
  atomFamily,
  DefaultValue,
  selectorFamily,
  useRecoilCallback,
} from 'recoil';
import { insertNth, range, sliceWithRest } from '../Shared/functions';
import { NoteId } from './note';

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

// FIXME: clean
type LineId = number;
type Ln = number;
type Line = string;

type Note = {
  noteId: NoteId;
  lines: string[];
};

export const noteId = atomFamily<NoteId, NoteId>({
  key: 'noteId',
  default: n => n,
});

export const noteLine = atomFamily<Line, { noteId: NoteId; lineId: LineId }>({
  key: 'noteLine',
  default: '',
});

export const noteLineS = selectorFamily<Line, { id: NoteId; ln: Ln }>({
  key: 'noteLineS',
  get: ({ id, ln }) => ({ get }) => {
    return get(noteLine({ noteId: id, lineId: get(lineIdsS(id))[ln] }));
  },
});

export const noteLines = selectorFamily<string[], NoteId>({
  key: 'noteLines',
  get: noteId => ({ get }) => {
    return get(lineIdsS(noteId)).map(lineId =>
      get(noteLine({ noteId, lineId })),
    );
  },
  set: noteId => ({ get, set }, lines) => {
    if (lines instanceof DefaultValue) return;

    // FIXME: clean
    const lineId = get(latestLineId);
    lines.map((line, index) =>
      set(noteLine({ noteId, lineId: index + lineId }), line),
    );
    set(latestLineId, id => id + lines.length);
    set(lineIdsS(noteId), range(lineId, lineId + lines.length));
  },
});

export const noteS = selectorFamily<Note, NoteId>({
  key: 'noteS',
  get: id => ({ get }) => ({
    noteId: get(noteId(id)),
    lines: get(noteLines(id)),
  }),
  set: id => ({ set }, note) => {
    if (note instanceof DefaultValue) return;

    set(noteId(id), note.noteId);
    set(noteLines(id), note.lines);
  },
});

export const lineIdsS = atomFamily<LineId[], NoteId>({
  key: 'lineIdsS',
  default: [],
});

const latestLineId = atom<LineId>({
  key: 'latestLineId',
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
  const makeId = useRecoilCallback(
    ({ set, snapshot }) => async () => {
      const newId = await snapshot.getPromise(latestLineId);
      set(latestLineId, newId + 1);
      return newId;
    },
    [],
  );

  const updateLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: Ln, value: string) => {
      const ids = await snapshot.getPromise(lineIdsS(noteId));
      set(noteLine({ noteId, lineId: ids[ln] }), value);
    },
    [],
  );

  // FIXME:
  const newLine = useRecoilCallback(
    ({ set, snapshot }) => async (ln: number, col: number) => {
      const note = await snapshot.getPromise(noteS(noteId));
      const line = note.lines[ln];
      const [half, rest] = sliceWithRest(line, col);
      set(noteLines(noteId), lines => [
        ...lines.slice(0, ln),
        half,
        rest,
        ...lines.slice(ln + 1),
      ]);
    },
    [],
  );

  /**
   * 行の追加
   * - idを生成
   * - lineを生成
   * - lineIdsに登録
   */
  const add = useRecoilCallback(
    ({ set, snapshot }) => async (ln: Ln, value: string) => {
      const lineId = await makeId();
      set(noteLine({ noteId, lineId }), value);
      set(lineIdsS(noteId), ids => insertNth(ids, ln, lineId));
    },
    [],
  );

  const removeLine = useRecoilCallback(
    ({ set }) => async (ln: number, focuedLine: string) => {
      if (ln === 0) return;

      // FIXME: note全体を更新しているが、本来は2行の更新のみでいい
      set(noteLines(noteId), lines => [
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
