import React, { memo } from 'react';
import { x } from '@xstyled/styled-components';
import { useFocus } from 'app/models/Cursor';
import { TextLines } from './components/Node/TextLinets';
import { NoteId } from 'app/models/notes/typings/note';
import { FocusedLine } from './components/Node/FocuedLine';

type Props = {
  noteId: NoteId;
};

export const Reditor: React.FC<Props> = memo(({ noteId }) => {
  const { ref: textareaRef, onFocus } = useFocus();

  return (
    <x.div bg='gray-200' position='relative' onClick={e => onFocus(e, noteId)}>
      <TextLines noteId={noteId} />
      <FocusedLine noteId={noteId} textareaRef={textareaRef} />
    </x.div>
  );
});
