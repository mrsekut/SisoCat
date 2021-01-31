import React from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';
import { useNote } from 'app/models/Note';

export const TextLines: React.FC = () => {
  const { note } = useNote();

  if (note == null) {
    return <></>;
  }

  return (
    <x.div>
      {note.lines.map((line, index) => (
        <Node line={line.value} index={index} />
      ))}
    </x.div>
  );
};
