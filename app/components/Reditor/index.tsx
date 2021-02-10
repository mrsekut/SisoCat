import React from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { useFocus, useNoteOp } from 'app/models/Cursor';
import { useHotKeyMapping } from './hooks/useHotKeyMapping';
import { TextLines } from './components/Node/TextLinets';
import { useGetNote } from 'app/models/notes/hooks/useGetNote';
import { useNotes } from 'app/models/notes';
import { useCursorKeymap } from 'app/models/Cursor/hooks/useCursorKeymap';

type Props = {
  noteId: number;
};

export const Reditor: React.FC<Props> = ({ noteId }) => {
  const keys = useCursorKeymap();
  const { remove, newLine, insert } = useNoteOp(noteId);
  const { keyMapping } = useHotKeyMapping({ ...keys, remove, newLine, insert });

  const resNote = useGetNote(noteId);
  const { note } = useNotes(resNote.id, resNote);

  const { ref: textareaRef, onFocus } = useFocus();

  return (
    <x.div bg='gray-200' position='relative' onClick={onFocus}>
      <Cursor onKeyDown={keyMapping} textareaRef={textareaRef} />
      {note != null && <TextLines note={note} />}
    </x.div>
  );
};
