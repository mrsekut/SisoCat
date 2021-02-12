import React from 'react';
import { useRecoilValue } from 'recoil';
import { cursorS } from 'app/models/Cursor';
import { Line } from './Line';
import { NoteId } from 'app/models/notes/typings/note';

type Props = {
  line: string;
  index: number;
  noteId: NoteId;
};

export const Node: React.FC<Props> = ({ line, index, noteId }) => {
  const cursor = useRecoilValue(cursorS);
  const isFocus = cursor.noteId === noteId && cursor.pos.ln === index;

  // if (node.type === 'block') {
  //   return <Block block={node} />;
  // }

  return (
    <>
      <Line line={line} index={index} isFocus={isFocus} />
      <br />
    </>
  );
};
