import React, { RefObject } from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { useFocus, useNoteOp } from 'app/models/Cursor';
import { useHotKeyMapping } from './hooks/useHotKeyMapping';
import { TextLines } from './components/Node/TextLinets';
import { useGetNote } from 'app/models/notes/hooks/useGetNote';
import { useNotes } from 'app/models/notes';
import { useCursorKeymap } from 'app/models/Cursor/hooks/useCursorKeymap';
import { Draggable } from '../Draggable';
import { NoteId } from 'app/models/notes/typings/note';

// FIXME: move
export const Reditors: React.FC<{ noteIds: number[] }> = ({ noteIds }) => {
  const { focusNoteId, ref: textareaRef, onFocus } = useFocus();

  return (
    <>
      {noteIds.map(id => (
        <Draggable>
          <Reditor
            noteId={id}
            isFocus={focusNoteId === id}
            textareaRef={textareaRef}
            onFocus={onFocus}
          />
        </Draggable>
      ))}
    </>
  );
};

type Props = {
  noteId: NoteId;
  isFocus: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onFocus: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    noteId: NoteId,
  ) => void;
};

export const Reditor: React.FC<Props> = ({
  noteId,
  isFocus,
  textareaRef,
  onFocus,
}) => {
  const keys = useCursorKeymap();
  const { remove, newLine, insert } = useNoteOp(noteId);
  const { keyMapping } = useHotKeyMapping(isFocus, {
    ...keys,
    remove,
    newLine,
    insert,
  });

  const resNote = useGetNote(noteId);
  const { note } = useNotes(resNote.id, resNote);

  return (
    <x.div bg='gray-200' position='relative' onClick={e => onFocus(e, noteId)}>
      {isFocus && <Cursor onKeyDown={keyMapping} textareaRef={textareaRef} />}
      {note != null && <TextLines note={note} />}
    </x.div>
  );
};
