import React from 'react';
import { x } from '@xstyled/styled-components';
import { useFocus } from 'app/models/Cursor';
import { TextLines } from './components/Node/TextLinets';
import { useNotes } from 'app/models/notes';
import { NoteId } from 'app/models/notes/typings/note';
import { FocusedLine } from './components/Node/FocuedLine';

type Props = {
  noteId: NoteId;
};

export const Reditor: React.FC<Props> = ({ noteId }) => {
  const { ref: textareaRef, onFocus } = useFocus();
  const { getNote } = useNotes();
  const note = getNote(noteId);

  return (
    <x.div bg='gray-200' position='relative' onClick={e => onFocus(e, noteId)}>
      {note != null && <TextLines note={note} />}
      <FocusedLine noteId={noteId} textareaRef={textareaRef} />
    </x.div>
  );
};
