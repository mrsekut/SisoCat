import React from 'react';
import { x } from '@xstyled/styled-components';
import { Indents } from './Indents';
import { Notation } from './Notation';
import { Empty } from './Empty';
import { parseLine } from '../Shared/parsers';
import { textStyle } from '../Shared/settings';
import { Ln } from '../Shared';

export type LineProps = {
  value: string;
  ln: Ln;
};

export const ViewLine: React.VFC<LineProps> = ({ value, ln }) => {
  const line = parseLine(value, ln).line;

  return (
    <x.div display='flex' h={`${textStyle.lineHeight}px`}>
      <Indents level={line.indent} />
      {line.nodes.map(node => (
        <Notation notation={node} ln={ln} />
      ))}

      <Empty pos={{ ln, col: line.text.length }} />
    </x.div>
  );
};
