import React from 'react';
import styled from 'styled-components';
import { BlokNodeM, LineNodeM, NodeM, NotationM } from '../../utils/types';

type Props = {
  node: NodeM;
};

export const Node: React.FC<Props> = ({ node }) => {
  console.log({ node });

  if (node.type === 'block') {
    return <Block block={node} />;
  }

  return (
    <>
      <Line line={node} />
      <br />
    </>
  );
};

const Block: React.FC<{ block: BlokNodeM }> = ({ block }) => {
  return null;
};

const Line: React.FC<{ line: LineNodeM }> = ({ line }) => {
  return (
    <>
      {line.line.nodes.map(node => (
        <Notation notation={node} />
      ))}
    </>
  );
};

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
