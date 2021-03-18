import React, { useEffect } from 'react';
import { ThemeProvider, x } from '@xstyled/styled-components';
import { useSetRecoilState } from 'recoil';
import { TextLines } from './components/TextLinets';
import { noteId, noteLines } from './Note';
import { theme } from './Shared/style';

type Props = {
  rstate: RState;
};

export const Reditor: React.VFC<Props> = ({ rstate }) => {
  return (
    <ThemeProvider theme={theme}>
      <x.div position='relative'>
        <TextLines />
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

// FIXME: clean
export const useReditor = ({ defaultValue }: Input): RState => {
  const setNote = useSetRecoilState(noteId(0));
  const setLines = useSetRecoilState(noteLines(0));

  useEffect(() => {
    setNote(0);
    setLines(defaultValue);
  }, []);

  return { value: [] };
};
