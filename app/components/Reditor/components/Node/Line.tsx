import React from 'react';
import { FocusedLine } from './FocuedLine';
import { useRecoilValue } from 'recoil';
import { cursorLn } from 'app/models/Cursor';
import { ViewLine } from './ViewLine';

type Props = {
  value: string;
  lineIndex: number;
};

export const Line: React.VFC<Props> = ({ value, lineIndex }) => {
  const ln = useRecoilValue(cursorLn);
  const isFocus = ln === lineIndex;

  if (isFocus) {
    return <FocusedLine value={value} lineIndex={lineIndex} />;
  }

  return <ViewLine value={value} lineIndex={lineIndex} />;
};
