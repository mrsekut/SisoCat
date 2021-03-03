import React, { useEffect, useRef } from 'react';
import styled from '@xstyled/styled-components';
import { cursorS } from 'app/models/Cursor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useHotKeyMapping } from '../../hooks/useHotKeyMapping';
import { Indents } from './Indents';
import { Cursor } from '../Cursor';
import { LineProps } from './ViewLine';
import { Char } from './Char';
import { insertNth } from 'app/utils/functions';
import { focuedLineS } from 'app/models/FocuedLine';
import { useNoteOp } from 'app/models/notes/hooks/useNoteOp';

export const FocusedLine: React.VFC<LineProps> = ({
  line,
  lineIndex,
}): JSX.Element => {
  const cursor = useRecoilValue(cursorS);
  const keys = useNoteOp(0);
  const { keyMapping } = useHotKeyMapping(keys);

  const [value, setValue] = useRecoilState(focuedLineS);
  useEffect(() => {
    setValue(line.nodeValue);
  }, []);

  const chars = makeChars(value, cursor.pos?.col ?? 0);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  // FIXME: 微妙, []の中もこれでいいのか
  useEffect(() => {
    if (cursor.isFocus && ref.current != null) {
      ref.current.focus();
    }
  }, [chars]);

  return (
    <Wrap>
      <Indents level={line.indent} />
      <span>
        {chars.map((char, index) => {
          if (char.type === 'cursor') {
            return (
              <Cursor noteId={0} onKeyDown={keyMapping} textareaRef={ref} />
            );
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
