import React, { useEffect, useRef, useState } from 'react';
import styled from '@xstyled/styled-components';
import { textStyle } from '../../utils/settings';
import { NoteId } from 'app/models/notes/typings/note';
import { useNoteOp } from 'app/models/notes/hooks/useNoteOp';
import { useHotKeyMapping } from '../../hooks/useHotKeyMapping';

export const HiddenTextarea: React.VFC = () => {
  const keys = useNoteOp(0);
  const { keyMapping } = useHotKeyMapping(keys);
  const {
    value,
    isComposing,
    onChange,
    onCompositionStart,
    onCompositionEnd,
  } = useInput(0);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.focus();
    }
  });

  return (
    <Textarea
      ref={ref}
      value={value}
      onKeyDown={e => {
        if (!isComposing) keyMapping(e);
      }}
      width={value.length}
      onChange={onChange}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
    />
  );
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
