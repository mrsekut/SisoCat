import React from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { useCursorKeymap, useFocus, useNoteOp } from 'app/models/Cursor';
import { useHotKeyMapping } from './hooks/useHotKeyMapping';
import { TextLines } from './components/Node/TextLinets';
import { useQuery } from 'blitz';
import getNote from 'app/models/notes/queries/getNote';

export const Reditor: React.FC = () => {
  const keys = useCursorKeymap();
  const { remove, newLine } = useNoteOp();
  const { keyMapping } = useHotKeyMapping({ ...keys, remove, newLine });
  const [note] = useQuery(getNote, { where: { id: 1 } });

  const { ref: textareaRef, onFocus } = useFocus();

  return (
    <x.div bg='gray-200' position='relative' onClick={onFocus}>
      <Cursor onKeyDown={keyMapping} textareaRef={textareaRef} />
      <TextLines />
    </x.div>
  );
};
