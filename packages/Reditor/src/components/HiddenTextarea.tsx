import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@xstyled/styled-components';
import { useHotKeyMapping } from '../FocusedLine/useHotKeyMapping';
import { NoteId } from '../Note/note';
import { useNoteOp } from '../Note/useNoteOp';
import { textStyle } from '../Shared/settings';

export const HiddenTextarea: React.VFC = () => {
  const { keyMapping } = useHotKeyMapping(useNoteOp(0));
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

const useInput = (noteId: NoteId) => {
  const [value, setValue] = useState('');
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
  };

  const onCompositionStart = useCallback(() => {
    setComposing(true);
  }, []);

  const onCompositionEnd = useCallback(() => {
    insert(value);
    setValue('');
    setComposing(false);
  }, [value]);

  return {
    onChange,
    onCompositionStart,
    onCompositionEnd,
    value,
    isComposing,
  };
};
