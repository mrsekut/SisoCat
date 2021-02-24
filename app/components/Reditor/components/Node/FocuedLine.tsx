import React, { RefObject } from 'react';
import styled from '@xstyled/styled-components';
import { cursorS, useNoteOp } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';
import { useHotKeyMapping } from '../../hooks/useHotKeyMapping';
import { NoteId } from 'app/models/notes/typings/note';
import { Indents } from './Indents';
import { Cursor } from '../Cursor';
import { textWithIndents } from '../../utils/parsers/parser';
import { Normal } from './Normal';

type Props = {
  noteId: NoteId;
  textareaRef: RefObject<HTMLTextAreaElement>;
};

export const FocusedLine: React.VFC<Props> = ({ noteId, textareaRef }) => {
  const cursor = useRecoilValue(cursorS);
  const { level, value } = textWithIndents.tryParse(cursor.line?.value ?? '');
  const keys = useNoteOp(noteId);
  const isFocus = noteId === cursor.noteId;
  const { keyMapping } = useHotKeyMapping(isFocus, keys);

  if (!isFocus) {
    return null;
  }

  return (
    <Span top={cursor.pxPos?.top ?? 0}>
      <Indents level={level} />
      <Normal value={value} />
      <Cursor
        noteId={noteId}
        textareaRef={textareaRef}
        onKeyDown={keyMapping}
      />
    </Span>
  );
};

const Span = styled.span<{ top: number }>`
  position: absolute;
  top: ${p => p.top}px;
  background-color: #ff8787;
`;
