import React from 'react';
import styled from '@xstyled/styled-components';
import { useFocus3, useNoteOp, _cursor2S } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';
import { useHotKeyMapping } from '../../hooks/useHotKeyMapping';
import { Indents } from './Indents';
import { Cursor } from '../Cursor';
import { Normal } from './Normal';
import { LineProps } from './ViewLine';

/**
 * TODO:
 * - 次にカーソルを表示
 * - 次にカーソルを動かす
 */

export const FocusedLine: React.VFC<LineProps> = ({ line, lineIndex }) => {
  // const cursor = useRecoilValue(cursorS);
  const cursor2 = useRecoilValue(_cursor2S);
  const { ref: textareaRef } = useFocus3();
  const keys = useNoteOp(0);
  const { keyMapping } = useHotKeyMapping(true, keys);

  return (
    <Wrap>
      <Indents level={line.indent} />
      <Normal value={line.nodeValue} lineIndex={cursor2.pos.ln} />
      <Cursor noteId={0} textareaRef={textareaRef} onKeyDown={keyMapping} />
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: #ff8787;
`;
