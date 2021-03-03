import React from 'react';
import { Line } from './Line';
import { x } from '@xstyled/styled-components';

type Props = {
  line: string;
  lineIndex: number;
};

export const Node: React.VFC<Props> = ({ line, lineIndex }) => {
  // if (node.type === 'block') {
  //   return <Block block={node} />;
  // }

  return (
    <x.div pb='2'>
      <Line value={line} lineIndex={lineIndex} />
    </x.div>
  );
};
