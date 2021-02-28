import React from 'react';
import { x } from '@xstyled/styled-components';
import { LineId, LineNodeM } from 'app/models/notes/typings/note';
import { Indents } from './Indents';
import { lineParser } from '../../utils/parsers/parser';
import { Notation } from './Notation';

type Props = {
  line: string;
  index: number;
};

export const Line: React.VFC<Props> = ({ line, index }) => {
  const node = parse(line, index);

  return (
    <x.div>
      <Indents level={node.line.indent} />
      {node.line.nodes.map(node => (
        <Notation notation={node} />
      ))}
    </x.div>
  );
};

const parse = (text: string, index: number): LineNodeM => {
  const result = lineParser(text, `line${index}` as LineId, index).tryParse(
    text,
  );

  return { type: 'line', line: result };
};
