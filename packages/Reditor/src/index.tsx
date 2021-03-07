import React, { useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TextLines } from './components/TextLinets';
import { noteS } from './Note/model';

type Props = {
  rstate: RState;
};

export const Reditor: React.VFC<Props> = ({ rstate }) => {
  const { value } = rstate;

  return (
    <x.div bg='gray-200' position='relative'>
      oooo
      {/* <TextLines lines={value} /> */}
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

  // useEffect(() => {
  //   setNote({
  //     noteId: 0,
  //     lines: defaultValue,
  //   });
  // }, []);

  return { value: ['wwww'] };
  // return { value: note.lines };
};
