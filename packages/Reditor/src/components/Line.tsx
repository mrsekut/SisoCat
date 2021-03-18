import React from 'react';
import { FocusedLine } from './FocusedLine';
import { useRecoilValue } from 'recoil';
import { ViewLine } from './ViewLine';
import { cursorLn } from '../Cursor';
import { lineIds, noteLine } from '../Note';

type Props = {
  // value: string;
  lineIndex: number;
};

export const Line: React.VFC<Props> = ({ lineIndex }) => {
  const ln = useRecoilValue(cursorLn);
  const ids = useRecoilValue(lineIds(0));
  const value = useRecoilValue(noteLine({ noteId: 0, lineId: ids[lineIndex] }));
  const isFocus = ln === lineIndex;

  if (isFocus) {
    return <FocusedLine value={value} lineIndex={lineIndex} />;
  }

  return <ViewLine value={value} lineIndex={lineIndex} />;
};
