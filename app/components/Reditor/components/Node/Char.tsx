import React from 'react';
import { x } from '@xstyled/styled-components';
import { Pos } from '../../utils/types';
import { useFocus } from 'app/models/Cursor';

type Props = {
  children: React.ReactChild;
  pos: Pos;
};

export const Char: React.VFC<Props> = ({ children, pos }) => {
  const { focus } = useFocus();
  return (
    <x.span
      onClick={() => focus(pos)}
      fontSize='base'
      fontFamily='mono'
      lineHeight='snug'
    >
      {children}
    </x.span>
  );
};
