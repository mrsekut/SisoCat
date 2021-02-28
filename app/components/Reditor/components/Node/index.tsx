import React from 'react';
import { Line } from './Line';

type Props = {
  line: string;
  lineIndex: number;
};

export const Node: React.VFC<Props> = ({ line, lineIndex }) => {
  // if (node.type === 'block') {
  //   return <Block block={node} />;
  // }

  return (
    <>
      <Line value={line} lineIndex={lineIndex} />
      <br />
    </>
  );
};
