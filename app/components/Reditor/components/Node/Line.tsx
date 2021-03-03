import React from 'react';
import { LineId, LineNodeM } from 'app/models/notes/typings/note';
import { lineParser } from '../../utils/parsers/parser';
import { FocusedLine } from './FocuedLine';
import { useRecoilValue } from 'recoil';
import { cursorPos } from 'app/models/Cursor';
import { ViewLine } from './ViewLine';

type Props = {
  value: string;
  lineIndex: number;
};

export const Line: React.VFC<Props> = ({ value, lineIndex }) => {
  const line = parse(value, lineIndex).line;
  const pos = useRecoilValue(cursorPos);
  const isFocus = pos.ln === lineIndex;

  if (isFocus) {
    return <FocusedLine line={line} lineIndex={lineIndex} />;
  }

  return <ViewLine line={line} lineIndex={lineIndex} />;
};

const parse = (text: string, index: number): LineNodeM => {
  const result = lineParser(text, `line${index}` as LineId, index).tryParse(
    text,
  );

  return { type: 'line', line: result };
};
