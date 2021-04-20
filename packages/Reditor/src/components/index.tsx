import React from 'react';
import { Line } from './Line';
import { x } from '@xstyled/styled-components';
import { Ln } from '../Shared';

type Props = {
  ln: Ln;
};

export const Node: React.VFC<Props> = ({ ln }) => {
  // if (node.type === 'block') {
  //   return <Block block={node} />;
  // }

  return (
    <x.div pb='2'>
      <Line ln={ln} />
    </x.div>
  );
};
