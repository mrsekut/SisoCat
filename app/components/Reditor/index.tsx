import React from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { Node } from './components/Node';
import { useCursorKeymap } from 'app/models/Cursor';
import { useHotKeyMapping } from './hooks/useHotKeyMapping';
import { useNote } from 'app/models/Note';

type Props = {
  text: string;
};

export const Reditor: React.FC<Props> = ({ text }) => {
  const keys = useCursorKeymap();
  const { remove } = useNote();
  useHotKeyMapping({ ...keys, remove });

  return (
    <x.div bg='gray-200' position='relative'>
      <Cursor />
      <TextLines text={text} />
    </x.div>
  );
};

// FIXME: move
export const TextLines: React.FC<{ text: string }> = ({ text }) => {
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
