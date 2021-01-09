import React from 'react';
import { CursorPos } from '../../hooks/useCursor';
import { BlokNodeM, LineNodeM, NodeM, NotationM } from '../../utils/types';
import { x } from '@xstyled/styled-components';

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
      return (
        <span>
          {[...notation.value].map((char, index) => (
            <Char key={index}>{char}</Char>
          ))}
        </span>
      );
    case 'italic':
      return <x.span fontStyle='italic'>{notation.value}</x.span>;
    case 'link':
      return <x.a href=''>{notation.value}</x.a>;
    default:
      return <></>;
  }
};

export const Char: React.FC = ({ children }) => {
  return <span>{children}</span>;
};
