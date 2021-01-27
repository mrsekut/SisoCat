import React from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { Node } from './components/Node';
import { useCursorKeymap, useNoteOp } from 'app/models/Cursor';
import { useHotKeyMapping } from './hooks/useHotKeyMapping';
import { useNote } from 'app/models/Note';

export const Reditor: React.FC = () => {
  const keys = useCursorKeymap();
  const { remove, insert } = useNoteOp();
  const { keyMapping } = useHotKeyMapping({ ...keys, remove, insert });

  return (
    <x.div bg='gray-200' position='relative'>
      <Cursor onKeyDown={keyMapping} />
      <TextLines />
    </x.div>
  );
};

// FIXME: move
export const TextLines: React.FC = () => {
  const { note } = useNote();

  if (note == null) {
    return <></>;
  }

  return (
    <x.div>
      {note.lines.map((line, index) => (
        <Node line={line} index={index} />
      ))}
    </x.div>
  );
};
