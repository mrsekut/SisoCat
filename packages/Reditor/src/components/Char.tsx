import React from 'react';
import { x } from '@xstyled/styled-components';
import { Pos } from '../Shared/typings';
import { useFocus } from '../Cursor/useFocus';

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
