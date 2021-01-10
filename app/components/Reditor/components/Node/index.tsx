import React, { useEffect, useRef } from 'react';
import { BlokNodeM, LineNodeM, NodeM, NotationM } from '../../utils/types';
import { x } from '@xstyled/styled-components';
import { useRecoilValue } from 'recoil';
import { cursorS, useCursor } from 'app/models/Cursor';

type Props = {
  node: NodeM;
};

export const Node: React.FC<Props> = ({ node }) => {
  const cursor = useRecoilValue(cursorS);

  if (node.type === 'block') {
    return <Block block={node} />;
  }

  return (
    <>
      <Line line={node} isFocus={node.line.lineIndex === cursor.pos.ln} />
      <br />
    </>
  );
};

// FIXME: move
const Block: React.FC<{ block: BlokNodeM }> = ({ block }) => {
  return null;
};

// FIXME: move
const Line: React.FC<{
  line: LineNodeM;
  isFocus: boolean;
}> = ({ line, isFocus }) => {
  const { setLineText } = useCursor();

  useEffect(() => {
    if (isFocus) {
      setLineText(line.line.text);
    }
  }, [isFocus]);

  if (isFocus) {
    return <Normal value={line.line.text} />;
  }

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
const Normal: React.FC<{ value: string }> = ({ value }) => {
  return (
    <span>
      {[...value].map((char, index) => (
        <Char key={index}>{char}</Char>
      ))}
    </span>
  );
};

// FIXME: move
export const Char: React.FC = ({ children }) => {
  const a = useRef(null);

  const [width, setWidth] = React.useState(0);

  // console.log({ width });
  React.useEffect(() => {
    // console.log(JSON.stringify(a.current.getBoundingClientRect()));
    // const s = window.getComputedStyle(a.current).fontFamily;
    // console.log(s);
  }, []);

  return (
    <x.span ref={a} fontSize='base' fontFamily='mono'>
      {children}
    </x.span>
  );
};
