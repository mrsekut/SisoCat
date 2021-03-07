import React from 'react';
import { x } from '@xstyled/styled-components';
import { Pos } from '../Shared/typings';
import { useFocus } from '../Cursor/model';

type Props = {
  pos: Pos;
};
export const Empty: React.VFC<Props> = ({ pos }) => {
  const { focus } = useFocus();
  return <x.span onClick={() => focus(pos)} flex='1 0 auto' />;
};
