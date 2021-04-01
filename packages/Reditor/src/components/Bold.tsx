import React from 'react';
import { x } from '@xstyled/styled-components';
import { Char } from './Char';
import { Ln } from '../Shared';

type Props = {
  value: string;
  ln: Ln;
};

export const Bold: React.VFC<Props> = ({ value, ln }) => (
  <x.span fontWeight='bold'>
    {[...value].map((char, index) => (
      <Char pos={{ ln, col: index }}>{char}</Char>
    ))}
  </x.span>
);
