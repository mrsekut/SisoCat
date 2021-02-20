import React from 'react';
import { x } from '@xstyled/styled-components';

type Props = {
  value: string;
};

export const Normal: React.FC<Props> = ({ value }) => {
  return (
    <span>
      {[...value].map(char => (
        <Char>{char}</Char>
      ))}
    </span>
  );
};

// FIXME: move
const Char: React.FC = ({ children }) => {
  return (
    <x.span fontSize='base' fontFamily='mono' lineHeight='snug'>
      {children}
    </x.span>
  );
};
