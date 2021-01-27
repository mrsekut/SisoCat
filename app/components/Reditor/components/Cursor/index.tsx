import React, { KeyboardEventHandler } from 'react';
import styled, { x } from '@xstyled/styled-components';
import { cursorS } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';

type Props = {
  onKeyDown: KeyboardEventHandler;
};

export const Cursor: React.FC<Props> = ({ onKeyDown }) => {
  const { pxPos } = useRecoilValue(cursorS);
  return (
    <x.div position='absolute' top={pxPos.top} left={pxPos.left} h={'1em'}>
      <Carret />
      <Textarea onKeyDown={onKeyDown} />
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

// FIXME: 日本語を入力したいなら必要
const Textarea = styled.button`
  top: 10px;
  left: 10px;
  width: 21px;
  height: 24px;
  font-size: 10px;
  /* position: absolute; */
  /* overflow: hidden;
  border: none;
  outline: none; */
  /* resize: none;
  padding: 0px; */
  /* z-index: 1; */
`;
