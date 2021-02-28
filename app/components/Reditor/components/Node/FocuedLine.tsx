import React from 'react';
import styled from '@xstyled/styled-components';
import { cursorS, useFocus, useNoteOp, _cursor2S } from 'app/models/Cursor';
import { useRecoilValue } from 'recoil';
import { useHotKeyMapping } from '../../hooks/useHotKeyMapping';
import { NoteId } from 'app/models/notes/typings/note';
import { Indents } from './Indents';
import { Cursor } from '../Cursor';
import { textWithIndents } from '../../utils/parsers/parser';
import { Normal } from './Normal';
import { LineProps } from './Line';

/**
 * TODO:
 * - まずlineを表示
 * - 次にカーソルを表示
 * - 次にカーソルを動かす
 */

type Props = {
  noteId: NoteId;
};

export const FocusedLine: React.VFC<LineProps> = ({ value, lineIndex }) => {
  const cursor = useRecoilValue(cursorS);
  const cursor2 = useRecoilValue(_cursor2S);
  const { ref: textareaRef, onFocus } = useFocus();
  // const { level, value } = textWithIndents.tryParse(cursor.line?.value ?? '');
  const keys = useNoteOp(0);
  // const isFocus = noteId === cursor.noteId;
  const { keyMapping } = useHotKeyMapping(true, keys);

  // if (!isFocus) {
  //   return null;
  // }

  return (
    <div>
      <Indents level={0} />
      <Normal value={'hgoehogehoghoge'} lineIndex={cursor2.pos.ln} />
      <Cursor noteId={0} textareaRef={textareaRef} onKeyDown={keyMapping} />
    </div>
  );

  // return (
  //   <Span top={cursor.pxPos?.top ?? 0}>
  //     <Indents level={level} />
  //     <Normal value={'hgoehogehoghoge'} lineIndex={cursor2.pos.ln} />
  //     <Cursor
  //       noteId={noteId}
  //       textareaRef={textareaRef}
  //       onKeyDown={keyMapping}
  //     />
  //   </Span>
  // );
};

const Span = styled.span<{ top: number }>`
  position: absolute;
  top: ${p => p.top}px;
  background-color: #ff8787;
`;
