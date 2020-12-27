import React from 'react';
import styled from 'styled-components';
import { Cursor } from './components/Cursor';
import { Node } from './components/Node';
import { note1 } from './utils/dummy';
import { NodeM } from './utils/types';

type Props = {
  text: string;
};

export const Reditor: React.FC<Props> = ({ text }) => {
  return (
    <Wrap>
      <TextLines text={text} />
      <Cursor />
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: #c7c7c7;
`;

export const TextLines: React.FC<Props> = ({ text }) => {
  // const nodes = parseText(text);
  const nodes = note1.nodes;

  return (
    <div>
      {nodes.map(node => (
        <Node node={node} />
      ))}
    </div>
  );
};

const parseText = (text: string): NodeM[] => {
  return [];
};
