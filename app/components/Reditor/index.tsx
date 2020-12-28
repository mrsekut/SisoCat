import React from 'react';
import styled from 'styled-components';
import { Cursor } from './components/Cursor';
import { Node } from './components/Node';
import { CursorPos, useCursor } from './hooks/useCursor';
import { note1 } from './utils/dummy';
import { textStyle } from './utils/settings';
import { NodeM } from './utils/types';

type Props = {
  text: string;
};

export const Reditor: React.FC<Props> = ({ text }) => {
  const { position } = useCursor();
  return (
    <Wrap>
      <Cursor cursorPos={position} />
      <TextLines text={text} cursorPos={position} />
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: #c7c7c7;
  position: relative;
`;

// FIXME: move
export const TextLines: React.FC<{ text: string; cursorPos: CursorPos }> = ({
  text,
  cursorPos,
}) => {
  // const nodes = parseText(text);
  const nodes = note1.nodes;

  return (
    <W>
      {nodes.map(node => (
        <Node node={node} cursorPos={cursorPos} />
      ))}
    </W>
  );
};

const W = styled.div`
  line-height: ${textStyle.lineHeight}px;
`;

const parseText = (text: string): NodeM[] => {
  return [];
};
