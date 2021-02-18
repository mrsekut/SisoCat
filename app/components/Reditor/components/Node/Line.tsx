import React from 'react';
import { x } from '@xstyled/styled-components';
import { parse } from 'app/models/notes';
import { NotationM } from 'app/models/notes/typings/note';
import { Indents } from './Indents';

type Props = {
  line: string;
  index: number;
};

export const Line: React.FC<Props> = ({ line, index }) => {
  const node = parse(line, index);

  return (
    <>
      <Indents level={node.line.indent} />
      {node.line.nodes.map(node => (
        <Notation notation={node} />
      ))}
    </>
  );
};

// FIXME: move
const Notation: React.FC<{ notation: NotationM }> = ({ notation }) => {
  switch (notation.type) {
    case 'normal':
      return <Normal value={notation.value} />;
    case 'italic':
      return <x.span fontStyle='italic'>{notation.value}</x.span>;
    case 'link':
      return <x.a href=''>{notation.value}</x.a>;
    case 'strong':
      return <x.span fontWeight='bold'>{notation.value}</x.span>;
    default:
      return <></>;
  }
};

// FIXME: move
export const Normal: React.FC<{ value: string }> = ({ value }) => {
  return (
    <span>
      {[...value].map(char => (
        <Char>{char}</Char>
      ))}
    </span>
  );
};

// FIXME: move
export const Char: React.FC = ({ children }) => {
  return (
    <x.span fontSize='base' fontFamily='mono' lineHeight='snug'>
      {children}
    </x.span>
  );
};
