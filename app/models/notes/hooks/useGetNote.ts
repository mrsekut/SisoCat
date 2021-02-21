import { makeRelDict } from 'app/components/Reditor/utils/dummies/dummy';
import { texts } from 'app/components/Reditor/utils/dummies/texts';
import { useTextWidths } from 'app/models/Cursor';
import { NoteM } from '../typings';

export const useGetNote = (noteId: number): NoteM => {
  const note = makeRelDict(texts)[noteId];
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
  };
};

// for debeug
export const useAllLoad = () => {
  const dict = makeRelDict(texts);
  const { textWidths } = useTextWidths();

  const allLoad = (): NoteM[] => {
    return Object.values(dict).map(note => {
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
      };
    });
  };
  return { allLoad };
};
