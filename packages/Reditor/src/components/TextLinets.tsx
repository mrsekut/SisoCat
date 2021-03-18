import React from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';
import { useRecoilValue } from 'recoil';
import { lineIds } from '../Note';

export const TextLines: React.VFC = () => {
  const ids = useRecoilValue(lineIds(0));
  return (
    <x.div>
      {ids.map((line, index) => (
        <Node lineIndex={index} />
      ))}
    </x.div>
  );
};
