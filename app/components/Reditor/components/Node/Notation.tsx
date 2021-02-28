import React from 'react';
import { x } from '@xstyled/styled-components';
import { Normal } from './Normal';
import { NotationM } from 'app/models/notes/typings/note';

type Props = {
  notation: NotationM;
  lineIndex: number;
};

export const Notation: React.VFC<Props> = ({ notation, lineIndex }) => {
  switch (notation.type) {
    case 'normal':
      return <Normal value={notation.value} lineIndex={lineIndex} />;
    case 'italic':
      return <x.span fontStyle='italic'>{notation.value}</x.span>;
    case 'link':
      return <x.a href=''>{notation.value}</x.a>;
    case 'strong':
      return <x.span fontWeight='bold'>{notation.value}</x.span>;
    default:
      return <></>;
  }
};
