import React, { KeyboardEventHandler, RefObject, useState } from 'react';
import styled, { x } from '@xstyled/styled-components';
import { cursorS, useNoteOp } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';
import { noteStyle } from 'app/utils/style';
import { useCursorKeymap } from 'app/models/Cursor/hooks/useCursorKeymap';
import { textStyle } from '../../utils/settings';

type Props = {
  onKeyDown: KeyboardEventHandler;
  textareaRef: RefObject<HTMLTextAreaElement>;
};

// FIXME: name, clean, move
const useA = () => {
  const [value, setValue] = useState('');
  const { right } = useCursorKeymap();
  const [isComposing, setComposing] = useState(false);
  const { insert } = useNoteOp(1); // FIXME: noteId

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
    // right();
  };

  const onCompositionStart = () => {
    setComposing(true);
  };

  const onCompositionEnd = () => {
    insert(value);
    setValue('');
    setComposing(false);
  };

  return {
    onChange,
    onCompositionStart,
    onCompositionEnd,
    value,
    isComposing,
  };
};

export const Cursor: React.FC<Props> = ({ onKeyDown, textareaRef }) => {
  const { pxPos } = useRecoilValue(cursorS);
  const {
    value,
    isComposing,
    onChange,
    onCompositionStart,
    onCompositionEnd,
  } = useA();

  if (pxPos == null) return null;
  return (
    <x.div position='absolute' top={pxPos.top} left={pxPos.left} h={'1em'}>
      <Carret />
      <Textarea
        ref={textareaRef}
        value={value}
        onKeyDown={e => {
          if (!isComposing) onKeyDown(e);
        }}
        width={value.length}
        onChange={onChange}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
      />
    </x.div>
  );
};

const Carret = () => (
  <x.div
    h='1.5em'
    w={1.5}
    fontSize='sm'
    lineHeight={noteStyle.lineHeight}
    bg='red-500'
    display='block'
  />
);

// FIXME:
const Textarea = styled.textarea<{ width: number }>`
  top: 0px;
  left: 0px;
  width: ${p => p.width * 16}px;
  height: 24px;
  font-size: ${textStyle.fontSize};
  position: absolute;
  overflow: hidden;
  border: none;
  outline: none;
  resize: none;
  padding: 0px;
  z-index: 1;
`;
