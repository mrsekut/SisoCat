import React from 'react';
import { Line } from './Line';

type Props = {
  line: string;
  index: number;
};

export const Node: React.FC<Props> = ({ line, index }) => {
  // if (node.type === 'block') {
  //   return <Block block={node} />;
  // }

  return (
    <>
      <Line line={line} index={index} />
      <br />
    </>
  );
};
