import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

type DeleteNoteInput = Pick<Prisma.NoteDeleteArgs, 'where'>;

export default async function deleteNote({ where }: DeleteNoteInput, ctx: Ctx) {
  ctx.session.authorize();

  const note = await db.note.delete({ where });

  return note;
}
