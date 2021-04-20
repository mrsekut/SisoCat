import React from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';
import { useRecoilValue } from 'recoil';
import { displayLids } from '../Note';
import { Ln } from '../Shared';

export const TextLines: React.VFC = () => {
  const lids = useRecoilValue(displayLids(0));

  return (
    <x.div>
      {lids.map((id, index) => (
        <Node key={id} ln={Ln(index)} />
      ))}
    </x.div>
  );
};
