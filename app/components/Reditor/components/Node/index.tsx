import React from 'react';
import { useRecoilValue } from 'recoil';
import { cursorS } from 'app/models/Cursor';
import { Line } from './Line';

type Props = {
  line: string;
  index: number;
};

// FIXME: Componentの構造がおかしい(blockとの対応がおかしい)
export const Node: React.FC<Props> = ({ line, index }) => {
  const cursor = useRecoilValue(cursorS);

  // if (node.type === 'block') {
  //   return <Block block={node} />;
  // }

  return (
    <>
      <Line line={line} index={index} isFocus={index === cursor.pos?.ln} />
      <br />
    </>
  );
};
