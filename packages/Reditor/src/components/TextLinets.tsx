import React from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';
import { useRecoilValue } from 'recoil';
import { lineIdsS } from '../Note';

export const TextLines: React.VFC = () => {
  const lineIds = useRecoilValue(lineIdsS(0));

  return (
    <x.div>
      {lineIds.map(index => (
        <Node ln={index} />
      ))}
    </x.div>
  );
};
