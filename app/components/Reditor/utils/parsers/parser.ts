import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import * as P from 'parser-ts/lib/Parser';
import * as C from 'parser-ts/lib/char';
import { run } from 'parser-ts/lib/code-frame';
import {
  ItalicN,
  LineId,
  LineM,
  LinkN,
  NormalN,
  NotationM,
  StrongN,
} from '../types';

// -------------------------------------------------------------------------------------
// util parsers
// -------------------------------------------------------------------------------------

export const anyOf = <S, T>(parsers: P.Parser<S, T>[]) =>
  parsers.reduceRight((acc, cur) => P.either(cur, () => acc), P.fail());

export const zenkaku = P.expected(
  P.sat((c: C.Char) => /[^x01-x7E]/.test(c.toLowerCase())),
  'a zenkaku',
);

const string = C.many1(C.alphanum);

const whitespace = C.many1(C.space);

export const brackets = P.between(C.char('['), C.char(']'));

const asterisks = P.many1(C.char('*'));

export const stringWithSpaces = pipe(
  P.many(anyOf([string, zenkaku, C.space])),
  P.map(v => v.join('')),
);

export const indent = P.many(anyOf([C.space, C.char('　'), C.char('\t')]));

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

const max3 = (n: number) => Math.min(3, n) as 1 | 2 | 3;

// -------------------------------------------------------------------------------------
// notation parsers
// -------------------------------------------------------------------------------------

export const normal: P.Parser<string, NormalN> = pipe(
  stringWithSpaces,
  P.map(v => ({ type: 'normal' as const, value: v })),
);

export const link: P.Parser<string, LinkN> = brackets(
  pipe(
    stringWithSpaces,
    P.map(v => ({ type: 'link' as const, references: [], value: v })),
  ),
);

// FIXME: name, clean
export const strong: P.Parser<string, StrongN> = brackets(
  pipe(
    asterisks,
    P.chain(a =>
      pipe(
        whitespace,
        P.chain(() => stringWithSpaces),
        P.map(v => ({
          type: 'strong' as const,
          value: v,
          level: max3(a.length),
        })),
      ),
    ),
  ),
);

export const italic: P.Parser<string, ItalicN> = brackets(
  pipe(
    C.char('/'),
    P.chain(() => whitespace),
    P.chain(() => stringWithSpaces),
    P.map(v => ({
      type: 'italic' as const,
      value: v,
    })),
  ),
);

// -------------------------------------------------------------------------------------
// line parsers
// -------------------------------------------------------------------------------------

const notation = anyOf<string, NotationM>([strong, italic, link, normal]);

export const notations = P.manyTill(notation, C.char('\n'));

export const line = (id: LineId, index: number): P.Parser<string, LineM> =>
  pipe(
    indent,
    P.chain(idt =>
      pipe(
        notations,
        P.map(v => ({
          id,
          lineIndex: index,
          nodes: v,
          indent: idt.length,
        })),
      ),
    ),
  );
