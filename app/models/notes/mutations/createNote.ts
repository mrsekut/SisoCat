import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

type CreateNoteInput = Pick<Prisma.NoteCreateArgs, 'data'>;
export default async function createNote({ data }: CreateNoteInput, ctx: Ctx) {
  ctx.session.authorize();

  const note = await db.note.create({ data });

  return note;
}
