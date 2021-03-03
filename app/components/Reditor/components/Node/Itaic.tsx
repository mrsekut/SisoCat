import React from 'react';
import { x } from '@xstyled/styled-components';
import { Char } from './Char';

type Props = {
  value: string;
  lineIndex: number;
};

export const Italic: React.VFC<Props> = ({ value, lineIndex }) => (
  <x.span fontStyle='italic'>
    {[...value].map((char, index) => (
      <Char pos={{ ln: lineIndex, col: index }}>{char}</Char>
    ))}
  </x.span>
);
