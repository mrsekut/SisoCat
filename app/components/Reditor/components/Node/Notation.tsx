import React from 'react';
import { x } from '@xstyled/styled-components';
import { Normal } from './Normal';
import { NotationM } from 'app/models/notes/typings/note';

type Props = {
  notation: NotationM;
};

export const Notation: React.VFC<Props> = ({ notation }) => {
  switch (notation.type) {
    case 'normal':
      return <Normal value={notation.value} />;
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
