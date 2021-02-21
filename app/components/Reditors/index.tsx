import React from 'react';
import { Draggable } from '../Draggable';
import { NoteId } from 'app/models/notes/typings/note';
import { Reditor } from '../Reditor';

type Props = {
  noteIds: NoteId[];
};

// FIXME: move
export const Reditors: React.FC<Props> = ({ noteIds }) => {
  return (
    <>
      {noteIds.map(id => (
        <Draggable>
          <Reditor noteId={id} />
        </Draggable>
      ))}
    </>
  );
};
