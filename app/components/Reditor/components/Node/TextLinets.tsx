import React, { memo, useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { Node } from '.';
import { NoteId } from 'app/models/notes/typings/note';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { noteS } from 'app/models/notes';
import { useGetNote } from 'app/models/notes/hooks/useGetNote';

type Props = {
  noteId: NoteId;
};

export const TextLines: React.VFC<Props> = memo(({ noteId }) => {
  const note = useRecoilValue(noteS(noteId));
  useInit(noteId);

  if (note == null) {
    return <></>;
  }

  return (
    <x.div>
      {note.lines.map((line, index) => (
        <Node line={line.value} index={index} />
      ))}
    </x.div>
  );
});

const useInit = (noteId: NoteId) => {
  const setNote = useSetRecoilState(noteS(noteId));
  const resNote = useGetNote(noteId);
  useEffect(() => {
    setNote(resNote);
  }, []);
};
