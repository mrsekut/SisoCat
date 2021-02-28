import React, { KeyboardEventHandler, RefObject, useState } from 'react';
import styled, { x } from '@xstyled/styled-components';
import { useNoteOp } from 'app/models/Cursor';
import { noteStyle } from 'app/utils/style';
import { textStyle } from '../../utils/settings';
import { NoteId } from 'app/models/notes/typings/note';

type Props = {
  noteId: NoteId;
  onKeyDown: KeyboardEventHandler;
  textareaRef: RefObject<HTMLTextAreaElement>;
};

// FIXME: clean, move
const useInput = (noteId: NoteId) => {
  const [value, setValue] = useState('');
  // const { right } = useCursorKeymap();
  const [isComposing, setComposing] = useState(false);
  const { insert } = useNoteOp(noteId);

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

export const Cursor: React.VFC<Props> = ({
  noteId,
  onKeyDown,
  textareaRef,
}) => {
  const {
    value,
    isComposing,
    onChange,
    onCompositionStart,
    onCompositionEnd,
  } = useInput(noteId);

  return (
    <x.div h='1em' display='inline-block'>
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

const Carret: React.VFC = () => (
  <x.div
    h='1.5em'
    w={1.5}
    fontSize='sm'
    lineHeight={noteStyle.lineHeight}
    bg='blue-500'
    display='inline-block'
  />
);

const Textarea = styled.textarea<{ width: number }>`
  top: 0px;
  left: 0px;
  width: ${p => p.width * textStyle.fontSize}px;
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
