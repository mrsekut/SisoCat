import React from 'react';
import { NoteId } from 'app/models/notes/typings/note';
import { Reditor } from '../Reditor';

type Props = {
  noteId: NoteId;
};

export const Reditors: React.VFC<Props> = ({ noteId }) => {
  return <Reditor noteId={0} />;
};
