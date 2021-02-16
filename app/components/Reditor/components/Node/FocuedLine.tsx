import React, { RefObject } from 'react';
import styled from '@xstyled/styled-components';
import { cursorS, useNoteOp } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';
import { useHotKeyMapping } from '../../hooks/useHotKeyMapping';
import { NoteId } from 'app/models/notes/typings/note';
import { Normal } from './Line';
import { Indents } from './Indents';
import { Cursor } from '../Cursor';
import { textWithIndents } from '../../utils/parsers/parser';

type Props = {
  noteId: NoteId;
  textareaRef: RefObject<HTMLTextAreaElement>;
};

export const FocusedLine: React.FC<Props> = ({ noteId, textareaRef }) => {
  const cursor = useRecoilValue(cursorS);
  const level = textWithIndents.tryParse(cursor.line?.value ?? '').level;
  const { ...keys } = useNoteOp(noteId);
  const isFocus = noteId === cursor.noteId;
  const { keyMapping } = useHotKeyMapping(isFocus, keys);

  return (
    <Span top={cursor.pxPos?.top ?? 0}>
      <Indents level={level} />
      <Normal value={cursor.line?.value ?? ''} />

      <Cursor textareaRef={textareaRef} onKeyDown={keyMapping} />
    </Span>
  );
};

const Span = styled.span<{ top: number }>`
  position: absolute;
  top: ${p => p.top}px;
  background-color: #ff8787;
`;
