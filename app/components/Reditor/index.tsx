import React, { useState } from 'react';
import { x } from '@xstyled/styled-components';
import { useFocus } from 'app/models/Cursor';
import { TextLines } from './components/Node/TextLinets';
import { FocusedLine } from './components/Node/FocuedLine';

type Props = {
  rstate: RState;
};

export const Reditor: React.VFC<Props> = ({ rstate }) => {
  const { value, setValue } = rstate;
  const { ref: textareaRef, onFocus } = useFocus();

  return (
    <x.div bg='gray-200' position='relative' onClick={e => onFocus(e, 0)}>
      <TextLines lines={value} />
      <FocusedLine noteId={0} textareaRef={textareaRef} />
    </x.div>
  );
};

/**
 * userに公開するhook
 * userは、このhookもしくは、Reditorのpropsから拡張できる
 * FIXME: move
 */
type Input = {
  defaultValue: string[];
};

type RState = {
  value: string[];
  setValue: (value: string[]) => void;
};

export const useReditor = ({ defaultValue }: Input): RState => {
  const [value, setValue] = useState(defaultValue);

  return { value, setValue };
};
