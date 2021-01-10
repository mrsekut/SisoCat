import { run } from 'parser-ts/lib/code-frame';
import React from 'react';
import { x } from '@xstyled/styled-components';
import { Cursor } from './components/Cursor';
import { Node } from './components/Node';
import { lineParser } from './utils/parsers/parser';
import { LineId, LineNodeM, NodeM } from './utils/types';
import * as E from 'fp-ts/lib/Either';
import { useCursor } from 'app/models/Cursor';

type Props = {
  text: string;
};

export const Reditor: React.FC<Props> = ({ text }) => {
  const _ = useCursor();
  return (
    <x.div bg='gray-200' position='relative'>
      <Cursor />
      <TextLines text={text} />
    </x.div>
  );
};

// FIXME: move
export const TextLines: React.FC<{ text: string }> = ({ text }) => {
  const nodes = useNote();

  return (
    <x.div onMouseDown={e => console.log(e.clientX)}>
      {nodes.map(node => (
        <Node node={node} />
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

  const line: LineNodeM[] = texts.map((text, i) => {
    const result = run(lineParser(text, `line${i}` as LineId, i), `${text}`);
    if (E.isRight(result)) {
      return { type: 'line', line: result.right };
    }
    throw Error('parse error');
  });

  return line;
};
