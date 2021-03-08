import React, { memo } from 'react';
import { x } from '@xstyled/styled-components';
import { HiddenTextarea } from './HiddenTextarea';
import { noteStyle } from '../Shared/style';

export const Cursor: React.VFC = memo(() => (
  <x.div h='1em' display='inline-block' position='absolute'>
    <Caret />

    {/* FIXME: ここでtop/leftのstyleをあてたい */}
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
