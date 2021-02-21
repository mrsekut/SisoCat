import React, { useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { useFocus } from 'app/models/Cursor';
import { TextLines } from './components/Node/TextLinets';
import { useGetNote } from 'app/models/notes/hooks/useGetNote';
import { useNotes } from 'app/models/notes';
import { NoteId } from 'app/models/notes/typings/note';
import { FocusedLine } from './components/Node/FocuedLine';

type Props = {
  noteId: NoteId;
};

export const Reditor: React.FC<Props> = ({ noteId }) => {
  const { ref: textareaRef, onFocus } = useFocus();
  const resNote = useGetNote(noteId);
  const { getNote, setNote } = useNotes();

  useEffect(() => {
    setNote(resNote.id)(resNote);
  }, []);

  const note = getNote(resNote.id);

  return (
    <x.div bg='gray-200' position='relative' onClick={e => onFocus(e, noteId)}>
      {note != null && <TextLines note={note} />}
      <FocusedLine noteId={noteId} textareaRef={textareaRef} />
    </x.div>
  );
};
