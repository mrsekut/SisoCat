import React from 'react';
import { NotationM } from '../Note';
import { Anchor } from './Anchor';
import { Bold } from './Bold';
import { Italic } from './Itaic';
import { Normal } from './Normal';

type Props = {
  notation: NotationM;
  lineIndex: number;
};

export const Notation: React.VFC<Props> = ({ notation, lineIndex }) => {
  switch (notation.type) {
    case 'normal':
      return <Normal value={notation.value} lineIndex={lineIndex} />;
    case 'italic':
      return <Italic value={notation.value} lineIndex={lineIndex} />;
    case 'link':
      return <Anchor value={notation.value} lineIndex={lineIndex} />;
    case 'strong':
      return <Bold value={notation.value} lineIndex={lineIndex} />;
    default:
      return <></>;
  }
};
