import React from 'react';
import { x } from '@xstyled/styled-components';
import { LineId, LineM, LineNodeM } from 'app/models/notes/typings/note';
import { Indents } from './Indents';
import { lineParser } from '../../utils/parsers/parser';
import { Notation } from './Notation';
import { FocusedLine } from './FocuedLine';
import { useRecoilValue } from 'recoil';
import { _cursor2S } from 'app/models/Cursor';

type Props = {
  value: string;
  lineIndex: number;
};

export const Line: React.VFC<Props> = ({ value, lineIndex }) => {
  const line = parse(value, lineIndex).line;
  const cursor2 = useRecoilValue(_cursor2S);
  const isFocus = cursor2.pos.ln === lineIndex;

  if (isFocus) {
    return <FocusedLine line={line} lineIndex={lineIndex} />;
  }

  return <ViewLine line={line} lineIndex={lineIndex} />;
};

// FIXME: move, name
export type LineProps = {
  line: LineM;
  lineIndex: number;
};

const ViewLine: React.VFC<LineProps> = ({ line, lineIndex }) => {
  return (
    <x.div>
      <Indents level={line.indent} />
      {line.nodes.map(node => (
        <Notation notation={node} lineIndex={lineIndex} />
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
