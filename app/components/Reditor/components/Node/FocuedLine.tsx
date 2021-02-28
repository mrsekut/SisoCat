import React from 'react';
import styled from '@xstyled/styled-components';
import { useFocus3, useNoteOp, _cursor2S } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';
import { useHotKeyMapping } from '../../hooks/useHotKeyMapping';
import { Indents } from './Indents';
import { Carret, Cursor } from '../Cursor';
import { LineProps } from './ViewLine';
import { Char } from './Char';
import { insertNth } from 'app/utils/functions';

/**
 * TODO:
 * - 次にカーソルを動かす
 */

export const FocusedLine: React.VFC<LineProps> = ({ line, lineIndex }) => {
  // const cursor = useRecoilValue(cursorS);
  const cursor2 = useRecoilValue(_cursor2S);
  const { ref: textareaRef } = useFocus3();
  const keys = useNoteOp(0);
  const { keyMapping } = useHotKeyMapping(true, keys);

  const chars = makeChars(line.nodeValue, cursor2.pos.col);

  return (
    <Wrap>
      <Indents level={line.indent} />
      <span>
        {chars.map((char, index) => {
          if (char.type === 'cursor') {
            return <Carret />;
          }

          return <Char pos={{ ln: lineIndex, col: index }}>{char.value}</Char>;
        })}
      </span>
    </Wrap>
  );
};

type CharType = { type: 'value'; value: string } | { type: 'cursor' };

const makeChars = (value: string, cursorIndex: number) => {
  const vs = [...value].map(v => ({
    type: 'value' as const,
    value: v,
  }));

  return insertNth<CharType>(vs, cursorIndex, { type: 'cursor' });
};

const Wrap = styled.div`
  background-color: #ff8787;
`;
