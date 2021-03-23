import React from 'react';
import { Line } from './Line';
import { x } from '@xstyled/styled-components';

type Props = {
  ln: number;
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
