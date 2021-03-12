import React from 'react';
import { x } from '@xstyled/styled-components';
import { Pos } from '../Shared/typings';
import { useFocus } from '../Cursor';
import { Space } from './Space';

type Props = {
  children: string;
  pos: Pos;
};

export const Char: React.VFC<Props> = ({ children, pos }) => {
  const { focus } = useFocus();
  const isSpace = /\s/.test(children);

  return (
    <x.span
      onClick={() => focus(pos)}
      fontSize='base'
      fontFamily='mono'
      lineHeight='snug'
    >
      {isSpace ? <Space /> : children}
    </x.span>
  );
};
