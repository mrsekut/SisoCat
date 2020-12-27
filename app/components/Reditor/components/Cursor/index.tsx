import React, { useState } from 'react';
import styled from 'styled-components';
import { Position } from '../../utils/types';

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ top: 10, left: 8 });
  return (
    <span>
      <Carret position={position} />
    </span>
  );
};

export const Carret: React.FC<{
  position: Position;
}> = ({ position }) => {
  const cursorSize = 20;

  return (
    <Wrap top={position.top} left={position.left}>
      <svg width='1px' height={cursorSize}>
        <rect x={0} y={0} width={1} height='100%' />
      </svg>
    </Wrap>
  );
};

const Wrap = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${p => p.top + 16}px;
  left: ${p => p.left}px;
  color: red;
`;
