import React from 'react';
import styled from 'styled-components';
import { CursorPos } from '../../hooks/useCursor';
import { BlokNodeM, LineNodeM, NodeM, NotationM } from '../../utils/types';

type Props = {
  node: NodeM;
  cursorPos: CursorPos;
};

export const Node: React.FC<Props> = ({ node, cursorPos }) => {
  if (node.type === 'block') {
    return <Block block={node} />;
  }

  return (
    <>
      <Line line={node} isFocus={node.line.lineIndex === cursorPos.lineIndex} />
      <br />
    </>
  );
};

// FIXME: move
const Block: React.FC<{ block: BlokNodeM }> = ({ block }) => {
  return null;
};

// FIXME: move
const Line: React.FC<{ line: LineNodeM; isFocus: boolean }> = ({
  line,
  isFocus,
}) => {
  return (
    <>
      {line.line.nodes.map(node => (
        <Notation notation={node} />
      ))}
    </>
  );
};

// FIXME: move
const Notation: React.FC<{ notation: NotationM }> = ({ notation }) => {
  switch (notation.type) {
    case 'normal':
      return <span>{notation.value}</span>;
    case 'italic':
      return <ItalicNode>{notation.value}</ItalicNode>;
    case 'link':
      return <Anchor href=''>{notation.value}</Anchor>;
    default:
      return <></>;
  }
};

const Anchor = styled.a``;

const ItalicNode = styled.span`
  font-style: italic;
`;
