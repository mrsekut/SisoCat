import styled from '@xstyled/styled-components';
import React, { useRef, useState } from 'react';

export const Draggable: React.FC = ({ children }) => {
  const [isDrag, setIsDrag] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [pxPos, setPxPos] = useState({ top: 0, left: 0 });
  const node = useRef<HTMLDivElement | null>(null);

  const handleDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const item = node.current;
    setIsDrag(true);

    if (item == null) return;

    setPos({
      x: e.pageX - item.offsetLeft,
      y: e.pageY - item.offsetTop,
    });
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDrag) {
      e.preventDefault();
      setPxPos({
        top: e.pageY - pos.y,
        left: e.pageX - pos.x,
      });
    }
  };

  const handleUp = () => {
    setIsDrag(false);
  };

  return (
    <Wrap
      ref={node}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      top={pxPos.top}
      left={pxPos.left}
    >
      {children}
    </Wrap>
  );
};

const Wrap = styled.div<{ top: number; left: number }>`
  padding: 3px;
  background-color: red;
  cursor: move;
  position: absolute;
  top: ${p => p.top}px;
  left: ${p => p.left}px;
`;
