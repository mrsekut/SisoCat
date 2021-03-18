import React, { useEffect } from 'react';
import { ThemeProvider, x } from '@xstyled/styled-components';
import { useSetRecoilState } from 'recoil';
import { TextLines } from './components/TextLinets';
import { noteIdS, noteLinesS } from './Note';
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
  const setNote = useSetRecoilState(noteIdS(0));
  const setLines = useSetRecoilState(noteLinesS(0));

  useEffect(() => {
    setNote(0);
    setLines(defaultValue);
  }, []);

  return { value: [] };
};
