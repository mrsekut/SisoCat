import React from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';
import { BlockM, NoteM } from 'app/models/notes/typings';

type Props = {
  note: NoteM;
};

export const TextLines: React.FC<Props> = ({ note }) => {
  if (note == null) {
    return <></>;
  }

  return (
    <x.div>
      {note.blocks.map(b => (
        <Block block={b} />
      ))}
    </x.div>
  );
};

const Block: React.FC<{ block: BlockM }> = ({ block }) => {
  return (
    <x.div>
      {block.lines.map((line, index) => (
        <Node line={line.value} index={index} />
      ))}
    </x.div>
  );
};
