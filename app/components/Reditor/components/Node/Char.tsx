import React from 'react';
import { x } from '@xstyled/styled-components';
import { Pos } from '../../utils/types';

type Props = {
  children: React.ReactChild;
  pos: Pos;
};

export const Char: React.VFC<Props> = ({ children, pos }) => {
  return (
    <x.span
      //
      data-pos={pos}
      fontSize='base'
      fontFamily='mono'
      lineHeight='snug'
    >
      {children}
    </x.span>
  );
};
