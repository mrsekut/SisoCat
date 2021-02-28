import React, { memo } from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';

type Props = {
  lines: string[];
};

export const TextLines: React.VFC<Props> = memo(({ lines }) => {
  return (
    <x.div>
      {lines.map((line, index) => (
        <Node line={line} index={index} />
      ))}
    </x.div>
  );
});
