import React from 'react';
import { Line } from './Line';
import { x } from '@xstyled/styled-components';

type Props = {
  lineIndex: number;
};

export const Node: React.VFC<Props> = ({ lineIndex }) => {
  // if (node.type === 'block') {
  //   return <Block block={node} />;
  // }

  return (
    <x.div pb='2'>
      <Line lineIndex={lineIndex} />
    </x.div>
  );
};
