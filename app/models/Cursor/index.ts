import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil';
import { useFont, useFontSize } from '@xstyled/styled-components';
import { useNote } from '../notes';
import { Line } from '../notes/typings/note';
import { useCursorKeymap } from './hooks/useCursorKeymap';
import { getTextWidths } from './utils';
import { Pos } from 'app/components/Reditor/utils/types';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

// px単位のposition
type PxPos = { top: number; left: number };

// FIXME:
type CursorFocus = {
  isFocus: true;
  pos: Pos;
  pxPos: PxPos;
  noteId: number;
  line: Line; // on the cursor
};

// FIXME:
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

const cursorFocus = atom({
  key: 'cursorFocus',
  default: false,
});

export const cursorPos = atom({
  key: 'cursorPos',
  default: { ln: 0, col: 0 },
});

export const cursorS = selector({
  key: 'cursorS',
  get: ({ get }) => ({
    isFocus: get(cursorFocus),
    pos: get(cursorPos),
  }),
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
  const cursor = useRecoilValue(cursorS);

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
  const focus = useRecoilCallback(
    ({ set }) => (pos: Pos) => {
      set(cursorFocus, true);
      set(cursorPos, pos);
    },
    [],
  );

  return { focus };
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
