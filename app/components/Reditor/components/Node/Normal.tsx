import React from 'react';
import { Char } from './Char';

type Props = {
  value: string;
  lineIndex: number;
};

export const Normal: React.VFC<Props> = ({ value, lineIndex }) => (
  <span>
    {[...value].map((char, index) => (
      <Char pos={{ ln: lineIndex, col: index }}>{char}</Char>
    ))}
  </span>
);
