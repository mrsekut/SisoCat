import assert from 'assert';

import * as E from 'fp-ts/Either';
import * as C from 'parser-ts/lib/char';
import { run } from 'parser-ts/lib/code-frame';

import {
  normal,
  link,
  strong,
  notations,
  italic,
  brackets,
  zenkaku,
  stringWithSpaces,
  indent,
  lineParser,
} from 'app/components/Reditor/utils/parsers/parser';
import {
  ItalicN,
  LineM,
  LinkN,
  NormalN,
  NotationM,
  StrongN,
} from 'app/components/Reditor/utils/types';

describe('Util Parsers', () => {
  it('brackets', () => {
    const parser = brackets(C.char('a'));
    const parsed = run(parser, '[a]');
    assert(E.isRight(parsed));
    const expected = 'a';
    assert.deepStrictEqual(parsed.right, expected);
  });

  it('zenkaku', () => {
    const parsed = run(C.many(zenkaku), 'あ亜');
    assert(E.isRight(parsed));
  });

  it('stringWithSpaces', () => {
    const parsed = run(stringWithSpaces, 'あいai　 ');
    assert(E.isRight(parsed));
  });

  it('indent', () => {
    const parsed = run(indent, '\t 　');
    assert(E.isRight(parsed));
  });
});

describe('Notation Parsers', () => {
  it('normal', () => {
    const parsed = run(normal, 'hoge');
    assert(E.isRight(parsed));
    const expected: NormalN = {
      type: 'normal',
      value: 'hoge',
    };
    assert.deepStrictEqual(parsed.right, expected);
  });

  describe('link', () => {
    it('word', () => {
      const parsed = run(link, '[hoge]');
      assert(E.isRight(parsed));
      const expected: LinkN = {
        type: 'link',
        references: [],
        value: 'hoge',
      };
      assert.deepStrictEqual(parsed.right, expected);
    });

    it('multi words', () => {
      const parsed = run(link, '[hoge hoge]');
      assert(E.isRight(parsed));
      const expected: LinkN = {
        type: 'link',
        references: [],
        value: 'hoge hoge',
      };
      assert.deepStrictEqual(parsed.right, expected);
    });
  });

  it('strong', () => {
    const parsed = run(strong, '[** hoge]');
    assert(E.isRight(parsed));
    const expected: StrongN = {
      type: 'strong',
      value: 'hoge',
      level: 2,
    };
    assert.deepStrictEqual(parsed.right, expected);
  });

  it('italic', () => {
    const parsed = run(italic, '[/ hoge]');
    assert(E.isRight(parsed));
    const expected: ItalicN = {
      type: 'italic',
      value: 'hoge',
    };
    assert.deepStrictEqual(parsed.right, expected);
  });
});

describe('Line Parsers', () => {
  it('notations', () => {
    const parsed = run(notations, '[TypeScript]は、 [*** すごい]');
    assert(E.isRight(parsed));
    const expected: NotationM[] = [
      { type: 'link', references: [], value: 'TypeScript' },
      { type: 'normal', value: 'は、 ' },
      { type: 'strong', level: 3, value: 'すごい' },
    ];
    assert.deepStrictEqual(parsed.right, expected);
  });

  it('notations', () => {
    const parsed = run(notations, '[TypeScript]は ');
    assert(E.isRight(parsed));
    const expected: NotationM[] = [
      { type: 'link', references: [], value: 'TypeScript' },
      { type: 'normal', value: 'は ' },
    ];
    assert.deepStrictEqual(parsed.right, expected);
  });

  it('notations', () => {
    const parsed = run(
      lineParser('line2', 3),
      '\t\t 　[TypeScript]は、 [*** すごい]',
    );
    assert(E.isRight(parsed));
    const expected: LineM = {
      id: 'line2',
      lineIndex: 3,
      indent: 4,
      nodes: [
        { type: 'link', references: [], value: 'TypeScript' },
        { type: 'normal', value: 'は、 ' },
        { type: 'strong', level: 3, value: 'すごい' },
      ],
    };
    assert.deepStrictEqual(parsed.right, expected);
  });
});
