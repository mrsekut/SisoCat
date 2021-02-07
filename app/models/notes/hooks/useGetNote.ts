import { note0 } from 'app/components/Reditor/utils/dummies/response';
import { useTextWidths } from 'app/models/Cursor';
import { BlockM, NoteM } from '../typings';

export const useGetNote = (noteId: number): NoteM => {
  const note = note0;
  // const [note] = useQuery(getNote, { where: { id: 1 } });
  // const [user] = useQuery(getUser, { where: { id: note.userId } });
  const { textWidths } = useTextWidths();

  const blocks: BlockM[] = note.blocks.map(b => ({
    id: b.id,
    author: {
      id: 'user1',
      name: 'mrsekut',
    },
    title: 'hoge',
    createdAt: new Date(),
    updatedAt: new Date(),
    references: [],
    lines: b.lines
      .split('\n')
      .map(line => ({ value: line, widths: textWidths(line) })),
  }));

  return {
    ...note,
    author: {
      id: 'user1',
      name: 'mrsekut',
    },
    blocks,
    references: [],
  };
};
