import { run } from 'parser-ts/lib/code-frame';
import React from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { Node } from './components/Node';
import { CursorPos, useCursor } from './hooks/useCursor';
import { lineParser } from './utils/parsers/parser';
import { LineId, LineNodeM, NodeM } from './utils/types';
import * as E from 'fp-ts/lib/Either';

type Props = {
  text: string;
};

export const Reditor: React.FC<Props> = ({ text }) => {
  const { position } = useCursor();
  return (
    <x.div bg='gray-200' position='relative'>
      <Cursor cursorPos={position} />
      <TextLines text={text} cursorPos={position} />
    </x.div>
  );
};

// FIXME: move
export const TextLines: React.FC<{ text: string; cursorPos: CursorPos }> = ({
  text,
  cursorPos,
}) => {
  const nodes = useNote();
  console.log({ nodes });

  return (
    <x.div>
      {nodes.map(node => (
        <Node node={node} cursorPos={cursorPos} />
      ))}
    </x.div>
  );
};

// FIXME: move
const useNote = (): NodeM[] => {
  // FIXME: fetch
  const texts = [
    '[TypeScript]は、 [/ すごい]です',
    '[TypeScript]は、 [*** すごい]',
    '[TypeScript]は、 [*** すごい]',
    '[TypeScript]は、 [*** すごい]',
  ];

  const line: LineNodeM[] = texts.map((t, i) => {
    const result = run(lineParser(`line${i}` as LineId, i), `${t}\n`);
    if (E.isRight(result)) {
      return { type: 'line', line: result.right };
    }
    throw Error('parse error');
  });

  return line;
};
