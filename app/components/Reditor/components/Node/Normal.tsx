import React from 'react';
import { x } from '@xstyled/styled-components';

type Props = {
  value: string;
};

export const Normal: React.VFC<Props> = ({ value }) => {
  return (
    <span>
      {[...value].map(char => (
        <Char>{char}</Char>
      ))}
    </span>
  );
};

// FIXME: move
const Char: React.VFC<{ children: React.ReactChild }> = ({ children }) => {
  return (
    <x.span fontSize='base' fontFamily='mono' lineHeight='snug'>
      {children}
    </x.span>
  );
};
