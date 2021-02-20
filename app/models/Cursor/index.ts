import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import { useRef } from 'react';
import { noteStyle } from 'app/utils/style';
import { noteS, lineInit, useNote, notesS } from '../notes';
import { Line, NoteId } from '../notes/typings/note';
import { useCursorKeymap } from './hooks/useCursorKeymap';
import { getTextWidths } from './utils';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

// px単位のposition
type PxPos = { top: number; left: number };

/**
 * line, column
 * e.g. `hog|ehoge`の時, (0,3)
 */
type Pos = {
  ln: number; // 0始まり、0行目, 1行目,..
  col: number; // 0始まり. 0文字目の左, 1文字目の左,..
};

type CursorFocus = {
  isFocus: true;
  pos: Pos;
  pxPos: PxPos;
  noteId: number;
  line: Line; // on the cursor
};

type CursorNotFocus = {
  isFocus: false;
  pos?: undefined;
  pxPos?: undefined;
  noteId?: undefined;
  line?: undefined;
};

type _CursorM = Exclude<CursorFocus, 'line'> | Exclude<CursorNotFocus, 'lien'>;

type CursorM = CursorFocus | CursorNotFocus;

// -------------------------------------------------------------------------------------
// States
// -------------------------------------------------------------------------------------

const cursorInit: _CursorM = {
  isFocus: false,
};

const _cursorS = atom<_CursorM>({
  key: '_cursorS',
  default: cursorInit,
});

export const cursorS = selector<CursorM>({
  key: 'cursorS',
  get: ({ get }) => {
    const cursor = get(_cursorS);
    if (!cursor.isFocus) {
      return cursor;
    }
    const note = get(notesS)[cursor.noteId];
    return {
      ...cursor,
      line: note.lines[cursor.pos.ln] ?? lineInit,
    };
  },
  set: ({ set }, newValue) => set(_cursorS, newValue),
});

const lineS = selector({
  key: 'lineS',
  get: ({ get }) => {
    const cursor = get(cursorS);
    if (!cursor.isFocus) return lineInit;
    return get(noteS)?.lines[cursor.pos.ln] ?? lineInit;
  },
});

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

/**
 * useCursorKeymapとuseNoteの接続
 * e.g. カーソル位置の文字削除、文字入力
 */
export const useNoteOp = (noteId: number) => {
  const note = useNote(noteId);
  const { left, right, down, move, up, begin, end } = useCursorKeymap();
  const [cursor] = useRecoilState(cursorS);

  const newLine = () => {
    if (cursor.pos == null) return;
    note.newLine(cursor.pos.ln, cursor.pos.col);
    down(true);
  };

  const remove = () => {
    if (cursor.pos == null) return;
    note.removeChar(cursor.pos.ln, cursor.pos.col);
    if (cursor.pos.col === 0) {
      const lines = note.note?.lines ?? [];
      const prevLine = lines[cursor.pos.ln - 1];
      move(prevLine.value.length, cursor.pos.ln - 1);
    } else {
      left();
    }
  };

  const insert = (value: string) => {
    if (cursor.pos == null) return;
    note.insertChar(cursor.pos.ln, cursor.pos.col, value);
    right(value.length);
  };

  return {
    note: note.note,
    newLine,
    remove,
    insert,
    up,
    left,
    right,
    down,
    begin,
    end,
    move,
  };
};

/**
 *
 */

export const useFocus = () => {
  const setCursor = useSetRecoilState(cursorS);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const line = useRecoilValue(lineS);

  const calcCoordinate = (
    x: number,
    y: number,
  ): { ln: number; col: number } => {
    return {
      ln: Math.floor(y / noteStyle.lineHeight),
      col: x,
    };
  };

  // initialize cusror
  const onFocus = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    noteId: NoteId,
  ) => {
    ref.current?.focus();
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = calcCoordinate(e.clientX - rect.left, e.clientY - rect.top);

    setCursor({
      isFocus: true,
      noteId,
      pos,
      pxPos: {
        top: pos.ln * noteStyle.lineHeight,
        left: 0, // FIXME:
      },
      line,
    });
  };

  return { ref, onFocus };
};

/**
 *
 */
export const useTextWidths = () => {
  const fontSize = useFontSize('base');
  const font = useFont('mono');
  const textWidths = (line: string) =>
    getTextWidths(line ?? '', `${fontSize} ${font}`);

  return { textWidths };
};
