import React from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { useCursorKeymap, useFocus, useNoteOp } from 'app/models/Cursor';
import { useHotKeyMapping } from './hooks/useHotKeyMapping';
import { TextLines } from './components/Node/TextLinets';
import { useGetNote } from 'app/models/notes/hooks/useGetNote';
import { useNote } from 'app/models/notes';

export const Reditor: React.FC = () => {
  const keys = useCursorKeymap();
  const { remove, newLine, insert } = useNoteOp();
  const { keyMapping } = useHotKeyMapping({ ...keys, remove, newLine, insert });
  const { note } = useNote(useGetNote(1));

  const { ref: textareaRef, onFocus } = useFocus();

  return (
    <x.div bg='gray-200' position='relative' onClick={onFocus}>
      <Cursor onKeyDown={keyMapping} textareaRef={textareaRef} />
      {note != null && <TextLines note={note} />}
    </x.div>
  );
};
