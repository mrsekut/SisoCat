import React from 'react';
import { x } from '@xstyled/styled-components';
import { Indents } from './Indents';
import { Notation } from './Notation';
import { Empty } from './Empty';
import { parseLine } from '../Shared/utils/parsers/parser';

export type LineProps = {
  value: string;
  lineIndex: number;
};

export const ViewLine: React.VFC<LineProps> = ({ value, lineIndex }) => {
  const line = parseLine(value, lineIndex).line;
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
