import React, { useEffect } from 'react';
import { ThemeProvider, x } from '@xstyled/styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TextLines } from './components/TextLinets';
import { noteS } from './Note/model';
import { theme } from './Shared/style';

type Props = {
  rstate: RState;
};

export const Reditor: React.VFC<Props> = ({ rstate }) => {
  const { value } = rstate;

  return (
    <ThemeProvider theme={theme}>
      <x.div position='relative'>
        <TextLines lines={value} />
      </x.div>
    </ThemeProvider>
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
      noteId: 0,
      lines: defaultValue,
    });
  }, []);

  return { value: note.lines };
};
