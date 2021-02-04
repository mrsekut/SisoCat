import { note0 } from 'app/components/Reditor/utils/dummy';
import { useTextWidths } from 'app/models/Cursor';
import { NoteM } from '../typings';

export const useGetNote = (noteId: number): NoteM => {
  const note = note0;
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
