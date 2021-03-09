import React from 'react';
import { x } from '@xstyled/styled-components';
import { Indents } from './Indents';
import { Notation } from './Notation';
import { Empty } from './Empty';
import { parseLine } from '../Shared/parsers';
import { textStyle } from '../Shared/settings';

export type LineProps = {
  value: string;
  lineIndex: number;
};

export const ViewLine: React.VFC<LineProps> = ({ value, lineIndex }) => {
  const line = parseLine(value, lineIndex).line;
  return (
    <x.div display='flex' h={`${textStyle.lineHeight}px`}>
      <Indents level={line.indent} />
      {line.nodes.map(node => (
        <Notation notation={node} lineIndex={lineIndex} />
      ))}

      <Empty pos={{ ln: lineIndex, col: line.text.length }} />
    </x.div>
  );
};
