import React from 'react';
import { NotationM } from '../Note';
import { Ln } from '../Shared';
import { Anchor } from './Anchor';
import { Bold } from './Bold';
import { Italic } from './Itaic';
import { Normal } from './Normal';

type Props = {
  notation: NotationM;
  ln: Ln;
};

export const Notation: React.VFC<Props> = ({ notation, ln: lineIndex }) => {
  switch (notation.type) {
    case 'normal':
      return <Normal value={notation.value} ln={lineIndex} />;
    case 'italic':
      return <Italic value={notation.value} ln={lineIndex} />;
    case 'link':
      return <Anchor value={notation.value} ln={lineIndex} />;
    case 'strong':
      return <Bold value={notation.value} ln={lineIndex} />;
    default:
      return <></>;
  }
};
