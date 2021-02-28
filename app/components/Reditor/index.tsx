import React, { useState } from 'react';
import { x } from '@xstyled/styled-components';
import { TextLines } from './components/Node/TextLinets';

type Props = {
  rstate: RState;
};

export const Reditor: React.VFC<Props> = ({ rstate }) => {
  const { value, setValue } = rstate;

  return (
    <x.div bg='gray-200' position='relative'>
      <TextLines lines={value} />
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
