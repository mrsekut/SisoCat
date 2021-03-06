import React, { memo } from 'react';
import { x } from '@xstyled/styled-components';
import { noteStyle } from 'app/utils/style';
import { HiddenTextarea } from './HiddenTextarea';

export const Cursor: React.VFC = memo(() => (
  <x.div h='1em' display='inline-block'>
    <Caret />
    <HiddenTextarea />
  </x.div>
));

const Caret: React.VFC = () => (
  <x.div
    h='1.5em'
    w={1.5}
    fontSize='sm'
    lineHeight={noteStyle.lineHeight}
    bg='blue-500'
    display='inline-block'
  />
);
