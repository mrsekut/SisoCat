import React, { useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { TextLines } from './components/Node/TextLinets';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { noteS } from 'app/models/notes';

type Props = {
  rstate: RState;
};

export const Reditor: React.VFC<Props> = ({ rstate }) => {
  const { value } = rstate;

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
};

export const useReditor = ({ defaultValue }: Input): RState => {
  const note = useRecoilValue(noteS(0));
  const setNote = useSetRecoilState(noteS(0));

  useEffect(() => {
    setNote({
      lines: defaultValue,
    });
  }, []);

  return { value: note.lines };
};
