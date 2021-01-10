import React from 'react';
import { x } from '@xstyled/styled-components';
import { cursorS } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';

export const Cursor: React.FC = () => {
  const { pxPos } = useRecoilValue(cursorS);
  return (
    <x.div position='absolute' top={pxPos.top} left={pxPos.left} h={'1em'}>
      <Carret />
      {/* <Textarea cursorPos={cursorPos} /> */}
    </x.div>
  );
};

const Carret = () => (
  <x.div
    h='1.5em'
    w={1.5}
    fontSize='sm'
    lineHeight='snug'
    bg='red-500'
    display='block'
  />
);
