import React from 'react';
import { Char } from './Char';

type Props = {
  value: string;
};

export const Normal: React.VFC<Props> = ({ value }) => (
  <span>
    {[...value].map(char => (
      <Char>{char}</Char>
    ))}
  </span>
);
