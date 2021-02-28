import React from 'react';
import { x } from '@xstyled/styled-components';
import { LineM } from 'app/models/notes/typings/note';
import { Indents } from './Indents';
import { Notation } from './Notation';
import { _cursor2S } from 'app/models/Cursor';

export type LineProps = {
  line: LineM;
  lineIndex: number;
};

export const ViewLine: React.VFC<LineProps> = ({ line, lineIndex }) => {
  return (
    <x.div>
      <Indents level={line.indent} />
      {line.nodes.map(node => (
        <Notation notation={node} lineIndex={lineIndex} />
      ))}
    </x.div>
  );
};
