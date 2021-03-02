import React, { useEffect, useState } from 'react';
import { x } from '@xstyled/styled-components';
import { TextLines } from './components/Node/TextLinets';
import { useSetRecoilState } from 'recoil';
import { noteS } from 'app/models/notes';

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
  const setNote = useSetRecoilState(noteS(0));

  useEffect(() => {
    setNote({
      lines: defaultValue,
    });
  }, []);

  return { value, setValue };
};
