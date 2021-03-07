import React from 'react';
import { x } from '@xstyled/styled-components';
import { Char } from './Char';

type Props = {
  value: string;
  lineIndex: number;
};

export const Normal: React.VFC<Props> = ({ value, lineIndex }) => (
  <x.span>
    {[...value].map((char, index) => (
      <Char pos={{ ln: lineIndex, col: index }}>{char}</Char>
    ))}
  </x.span>
);
