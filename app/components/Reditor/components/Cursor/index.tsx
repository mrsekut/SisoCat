import React from 'react';
import { x } from '@xstyled/styled-components';
import { CursorPos } from '../../hooks/useCursor';

type Props = {
  cursorPos: CursorPos;
};

export const Cursor: React.FC<Props> = ({ cursorPos }) => {
  return (
    <x.div
      position='absolute'
      top={cursorPos.top}
      left={cursorPos.left}
      h={'1em'}
    >
      <Carret />
      {/* <Textarea cursorPos={cursorPos} /> */}
    </x.div>
  );
};

const Carret = () => (
  <x.div
    h='1em'
    w={1.5}
    fontSize='sm'
    lineHeight='snug'
    bg='red-500'
    display='block'
  />
);
