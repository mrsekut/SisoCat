import React from 'react';
import { x } from '@xstyled/styled-components';
import { Char } from './Char';

type Props = {
  value: string;
  ln: number;
};

export const Italic: React.VFC<Props> = ({ value, ln }) => (
  <x.span fontStyle='italic'>
    {[...value].map((char, index) => (
      <Char pos={{ ln, col: index }}>{char}</Char>
    ))}
  </x.span>
);
