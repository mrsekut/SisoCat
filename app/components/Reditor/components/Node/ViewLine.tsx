import React from 'react';
import { x } from '@xstyled/styled-components';
import { LineM } from 'app/models/notes/typings/note';
import { Indents } from './Indents';
import { Notation } from './Notation';
import { Empty } from './Empty';

export type LineProps = {
  line: LineM;
  lineIndex: number;
};

export const ViewLine: React.VFC<LineProps> = ({ line, lineIndex }) => {
  return (
    <x.div display='flex'>
      <Indents level={line.indent} />
      {line.nodes.map(node => (
        <Notation notation={node} lineIndex={lineIndex} />
      ))}

      {/* FIXME: ここでflex='1 0 auto'を指定したい */}
      <Empty pos={{ ln: lineIndex, col: line.text.length }} />
    </x.div>
  );
};
