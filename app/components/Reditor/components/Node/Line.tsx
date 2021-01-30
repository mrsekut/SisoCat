import React, { useEffect, useRef, useState } from 'react';
import { NotationM } from '../../utils/types';
import { x } from '@xstyled/styled-components';
import { useSetRecoilState } from 'recoil';
import { cursorS } from 'app/models/Cursor';
import { parse } from 'app/models/Note';

type Props = {
  line: string;
  index: number;
  isFocus: boolean;
};

export const Line: React.FC<Props> = ({ line, index, isFocus }) => {
  const setLineText = useSetRecoilState(cursorS);

  // FIXME:
  useEffect(() => {
    if (isFocus) {
      setLineText(cur => {
        if (!cur.isFocus) return cur;
        return { ...cur, lineText: line };
      });
    }
  }, [isFocus]);

  const node = parse(line, index);

  if (isFocus) {
    return (
      <>
        {/* <Indent level={node.line.indent} /> */}
        <Normal value={line} />
      </>
    );
  }

  return (
    <>
      {/* <Indent level={node.line.indent} /> */}
      {node.line.nodes.map(node => (
        <Notation notation={node} />
      ))}
    </>
  );
};

// FIXME:
const Indent: React.FC<{ level: number }> = ({ level }) => {
  return (
    <span>
      {/* {range(level - 1).map(_ => (
        <Char>&nbsp;</Char>
      ))} */}
      {/* <x.span w='1.5em'>
        <x.span
          display='inline-block'
          w='5px'
          h='5px'
          borderRadius='full'
          backgroundColor='black'
        ></x.span>
        <x.span
          display='inline-block'
          w='6px'
          h='6px'
          borderRadius='full'
        ></x.span>
      </x.span> */}
    </span>
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
      {[...value].map(char => (
        <Char>{char}</Char>
      ))}
    </span>
  );
};

// FIXME: move
export const Char: React.FC = ({ children }) => {
  const a = useRef(null);

  const [width, setWidth] = useState(0);

  // console.log({ width });
  useEffect(() => {
    // console.log(JSON.stringify(a.current.getBoundingClientRect()));
    // const s = window.getComputedStyle(a.current).fontFamily;
    // console.log(s);
  }, []);

  return (
    <x.span ref={a} fontSize='base' fontFamily='mono' lineHeight='snug'>
      {children}
    </x.span>
  );
};
