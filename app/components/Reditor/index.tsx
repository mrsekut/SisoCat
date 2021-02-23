import React, { memo, useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { useFocus } from 'app/models/Cursor';
import { TextLines } from './components/Node/TextLinets';
import { NoteId } from 'app/models/notes/typings/note';
import { FocusedLine } from './components/Node/FocuedLine';
import { useNote } from 'app/models/notes';
import { useGetNote } from 'app/models/notes/hooks/useGetNote';

type Props = {
  noteId: NoteId;
};

export const Reditor: React.VFC<Props> = memo(({ noteId }) => {
  const { ref: textareaRef, onFocus } = useFocus();
  const { note, setNote } = useNote(noteId);
  const resNote = useGetNote(noteId);

  useEffect(() => {
    setNote(resNote);
  }, []);

  return (
    <x.div bg='gray-200' position='relative' onClick={e => onFocus(e, noteId)}>
      {note != null && <TextLines note={note} />}
      <FocusedLine noteId={noteId} textareaRef={textareaRef} />
    </x.div>
  );
});
