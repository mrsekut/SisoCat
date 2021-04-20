import React from 'react';
import { FocusedLine } from './FocusedLine';
import { useRecoilValue } from 'recoil';
import { ViewLine } from './ViewLine';
import { noteLineByLnS } from '../Note';
import { cursorLnS } from '../Cursor';
import { Ln } from '../Shared';

type Props = {
  ln: Ln;
};

export const Line: React.VFC<Props> = ({ ln }) => {
  const cursorLn = useRecoilValue(cursorLnS);
  const value = useRecoilValue(noteLineByLnS({ id: 0, ln }));
  const isFocus = cursorLn === ln;

  if (isFocus) {
    return <FocusedLine value={value} ln={ln} />;
  }

  return <ViewLine value={value} ln={ln} />;
};
