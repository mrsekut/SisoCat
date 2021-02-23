import styled, { css } from '@xstyled/styled-components';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// -------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------

type Pos = { x: number; y: number };

// -------------------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------------------

export const Draggable: React.VFC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const { handleMouseDown, isDragging, pos, ref } = useDrag();

  return (
    <Wrap isDragging={isDragging} pos={pos}>
      <Header onMouseDown={handleMouseDown} ref={ref}>
        title
      </Header>
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
  const [origin, setOrigin] = useState<Pos>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const item = ref.current;
      setIsDragging(true);
      if (item == null) return;
      setOrigin({
        x: e.pageX - item.offsetLeft,
        y: e.pageY - item.offsetTop,
      });
    },
    [ref.current],
  );

  const _handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // FIXME: 動き始めにカクつく
      setPos({
        x: e.clientX - origin.x,
        y: e.clientY - origin.y,
      });
    },
    [id, origin],
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
    ref,
  };
};
