import {
  NormalN,
  StrongN,
  ItalicN,
  LinkN,
  LineId,
  LineM,
} from 'app/models/notes/typings/note';
import * as bnb from 'bread-n-butter';

// -------------------------------------------------------------------------------------
// util parsers
// -------------------------------------------------------------------------------------

export const brackets = <T>(parser: bnb.Parser<T>) =>
  parser.wrap(bnb.text('['), bnb.text(']'));

export const whitespace1 = bnb.match(/\s+/).repeat(1);

const asterisks = bnb
  .text('*')
  .repeat()
  .map(as => as.length);

export const indents = bnb
  .match(/\s/)
  .repeat()
  .map(is => is.length);

const brLWithoutBrR = bnb.match(/\[(?!(.*\]))/);

const any = bnb.match(/./);

const splitIndents = bnb.all(indents, any.repeat());

export const textWithIndents = splitIndents.map(([level, value]) => ({
  level,
  value: value.join(''),
}));

const max3 = (n: number) => Math.min(3, n) as 1 | 2 | 3;

// -------------------------------------------------------------------------------------
// notation parsers
// -------------------------------------------------------------------------------------

export const normal: bnb.Parser<NormalN> = bnb
  .match(/[^[]+/)
  .or(brLWithoutBrR)
  .repeat(1)
  .map(cs => cs.join(''))
  .map(v => ({ type: 'normal', value: v }));

export const strong: bnb.Parser<StrongN> = brackets(
  bnb.all(asterisks, whitespace1, bnb.match(/[^\]]+/)).map(([as, _, v]) => ({
    type: 'strong',
    value: v,
    level: max3(as),
  })),
);

export const italic: bnb.Parser<ItalicN> = brackets(
  bnb
    .text('/')
    .next(whitespace1)
    .next(bnb.match(/[^\]]+/))
    .map(v => ({ type: 'italic', value: v })),
);

export const link: bnb.Parser<LinkN> = brackets(bnb.match(/[^\]]*/)).map(v => ({
  type: 'link',
  references: [],
  value: v,
}));

// -------------------------------------------------------------------------------------
// line parsers
// -------------------------------------------------------------------------------------

export const notation = bnb.choice(italic, strong, link);

export const notations = bnb.choice(notation, normal).repeat();

export const lineParser = (
  text: string,
  id: LineId,
  index: number,
): bnb.Parser<LineM> =>
  splitIndents.map(([level, value]) => {
    const v = value.join('');
    return {
      id,
      lineIndex: index,
      text,
      indent: level,
      nodeValue: v,
      nodes: notations.tryParse(v),
    };
  });
