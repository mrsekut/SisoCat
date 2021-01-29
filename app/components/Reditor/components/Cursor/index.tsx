import React, { KeyboardEventHandler, RefObject, useState } from 'react';
import styled, { x } from '@xstyled/styled-components';
import { cursorS, useCursorKeymap, useNoteOp } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';

type Props = {
  onKeyDown: KeyboardEventHandler;
  textareaRef: RefObject<HTMLTextAreaElement>;
};

// FIXME: hook
export const Cursor: React.FC<Props> = ({ onKeyDown, textareaRef }) => {
  const { pxPos } = useRecoilValue(cursorS);
  const [value, setValue] = useState('');
  const { right } = useCursorKeymap();
  const [isComposing, setComposing] = useState(false);
  const { insert } = useNoteOp();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // hankaku
    if (!isComposing) {
      insert(e.target.value);
      return;
    }

    // zenkaku
    setValue(e.target.value);
    // FIXME: 「か」で「ka」の2文字分動いている
    // FIXME: カーソルは右に行くが、既存の文字が動いていない
    right();
  };

  const start = () => {
    setComposing(true);
  };

  const end = () => {
    insert(value);
    setValue('');
    setComposing(false);
  };

  if (pxPos == null) return null;
  return (
    <x.div position='absolute' top={pxPos.top} left={pxPos.left} h={'1em'}>
      <Carret />
      <Textarea
        ref={textareaRef}
        value={value}
        onKeyDown={onKeyDown}
        width={value.length}
        onChange={onChange}
        onCompositionStart={start}
        onCompositionEnd={end}
      />
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

// FIXME:
const Textarea = styled.textarea<{ width: number }>`
  top: 10px;
  left: 10px;
  width: ${p => p.width * 16}px;
  height: 24px;
  font-size: 10px;
  position: absolute;
  overflow: hidden;
  border: none;
  outline: none;
  resize: none;
  padding: 0px;
  z-index: 1;
`;
