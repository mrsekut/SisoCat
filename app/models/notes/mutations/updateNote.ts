import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

type UpdateNoteInput = Pick<Prisma.NoteUpdateArgs, 'where' | 'data'>;

export default async function updateNote(
  { where, data }: UpdateNoteInput,
  ctx: Ctx,
) {
  ctx.session.authorize();

  const note = await db.note.update({ where, data });

  return note;
}
