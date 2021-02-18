import styled, { css } from '@xstyled/styled-components';
import React, { useCallback, useEffect, useState } from 'react';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

type Pos = { x: number; y: number };

// -------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------

export const Draggable: React.FC = ({ children }) => {
  const { handleMouseDown, isDragging, pos } = useDrag();

  return (
    <Wrap isDragging={isDragging} pos={pos}>
      <Header onMouseDown={handleMouseDown}>title</Header>
      {children}
    </Wrap>
  );
};

// -------------------------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------------------------

const Wrap = styled.div<{ isDragging: boolean; pos: Pos }>`
  padding: 3px;
  background-color: red;
  position: absolute;
  ${p => (p.isDragging ? IsDragging : IsNotDragging)};
  transform: ${p => css`translate(${p.pos.x}px, ${p.pos.y}px)`};
`;

const IsDragging = css`
  transition: none;
  z-index: 2;
  position: absolute;
`;

const IsNotDragging = css`
  transition: transform 500ms;
  z-index: 1;
  position: relative;
`;

const Header = styled.div`
  cursor: move;
`;

// -------------------------------------------------------------------------------------
// Hooks
// -------------------------------------------------------------------------------------

const useDrag = (id = '0') => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    ({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsDragging(true);
      setPos({
        x: clientX,
        y: clientY,
      });
    },
    [],
  );

  const _handleMouseMove = useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      setPos({
        x: clientX,
        y: clientY,
      });
    },
    [id],
  );

  const _handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', _handleMouseMove);
      window.addEventListener('mouseup', _handleMouseUp);
    } else {
      window.removeEventListener('mousemove', _handleMouseMove);
      window.removeEventListener('mouseup', _handleMouseUp);
    }
  }, [isDragging, _handleMouseMove, _handleMouseUp]);

  return {
    handleMouseDown,
    isDragging,
    pos,
  };
};
