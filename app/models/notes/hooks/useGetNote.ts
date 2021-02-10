import { note1, note2 } from 'app/components/Reditor/utils/dummy';
import { useTextWidths } from 'app/models/Cursor';
import { NoteM } from '../typings';

export const useGetNote = (noteId: number): NoteM => {
  const note = dummyNote(noteId);
  // const [note] = useQuery(getNote, { where: { id: 1 } });
  // const [user] = useQuery(getUser, { where: { id: note.userId } });
  const { textWidths } = useTextWidths();

  const lines = note.lines
    .split('\n')
    .map(line => ({ value: line, widths: textWidths(line) }));

  return {
    ...note,
    author: {
      id: 'user1',
      name: 'mrsekut',
    },
    lines,
    references: [],
  };
};

const dummyNote = (noteId: number) => {
  switch (noteId) {
    case 2:
      return note2;
    default:
      return note1;
  }
};
