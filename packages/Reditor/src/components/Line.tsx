import React from 'react';
import { FocusedLine } from './FocusedLine';
import { useRecoilValue } from 'recoil';
import { ViewLine } from './ViewLine';
import { cursorLn } from '../Cursor/model';

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
