import React from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';
import { NoteM } from 'app/models/notes/typings';

type Props = {
  note: NoteM;
};

export const TextLines: React.FC<Props> = ({ note }) => {
  if (note == null) {
    return <></>;
  }

  return (
    <x.div>
      {note.lines.map((line, index) => (
        <Node line={line.value} index={index} noteId={note.id} />
      ))}
    </x.div>
  );
};
