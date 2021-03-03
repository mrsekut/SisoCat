import * as bnb from 'bread-n-butter';
import {
  brackets,
  indents,
  italic,
  lineParser,
  link,
  normal,
  notation,
  notations,
  strong,
} from 'app/components/Reditor/utils/parsers/parser';

describe('Util Parsers', () => {
  it('brackets', () => {
    const parser = brackets(bnb.text('a'));
    ok(parser, '[a]', 'a');
  });

  it('indents', () => {
    ok(indents, '\t 　', 3);
  });
});

describe('Notation Parsers', () => {
  it('normal', () => {
    ok(normal, 'hoge', { type: 'normal', value: 'hoge' });
  });

  describe('link', () => {
    it('word', () => {
      ok(link, '[hoge]', { type: 'link', references: [], value: 'hoge' });
    });

    it('multi words', () => {
      ok(link, '[hoge hoge]', {
        type: 'link',
        references: [],
        value: 'hoge hoge',
      });
    });

    it('empty', () => {
      ok(link, '[]', { type: 'link', references: [], value: '' });
    });
  });

  it('strong', () => {
    ok(strong, '[** hoge]', { type: 'strong', value: 'hoge', level: 2 });
    ok(strong, '[** hog[[[e]', { type: 'strong', value: 'hog[[[e', level: 2 });
  });

  it('italic', () => {
    ok(italic, '[/ hoge]', { type: 'italic', value: 'hoge' });
  });
});

describe('Notation Parsers', () => {
  it('strong or normal', () => {
    ok(notation, '[** hoge]', { type: 'strong', value: 'hoge', level: 2 });
    ok(notation, '[**hoge]', { type: 'link', references: [], value: '**hoge' });
  });
});

describe('Notations Parsers', () => {
  it('normal', () => {
    ok(notations, '[hoge', [{ type: 'normal', value: '[hoge' }]);
    ok(notations, 'hoge[hoge', [{ type: 'normal', value: 'hoge[hoge' }]);
    ok(notations, 'hoge[ho[[ss]ge', [
      { type: 'normal', value: 'hoge' },
      { type: 'link', value: 'ho[[ss', references: [] },
      { type: 'normal', value: 'ge' },
    ]);
  });

  it('notations', () => {
    ok(notations, '[TypeScript]は、 [*** すごい]', [
      { type: 'link', references: [], value: 'TypeScript' },
      { type: 'normal', value: 'は、 ' },
      { type: 'strong', level: 3, value: 'すごい' },
    ]);
  });

  it('notations', () => {
    ok(notations, '[TypeScript]は ', [
      { type: 'link', references: [], value: 'TypeScript' },
      { type: 'normal', value: 'は ' },
    ]);
  });
});

describe('Line Parsers', () => {
  it('notations', () => {
    const text = '\t\t 　[TypeScript]は、 [*** すごい]';
    ok(lineParser(text, 'line2', 3), text, {
      id: 'line2',
      lineIndex: 3,
      indent: 4,
      text,
      nodeValue: '[TypeScript]は、 [*** すごい]',
      nodes: [
        { type: 'link', references: [], value: 'TypeScript' },
        { type: 'normal', value: 'は、 ' },
        { type: 'strong', level: 3, value: 'すごい' },
      ],
    });
  });
});

function ok<A>(parser: bnb.Parser<A>, input: string, expected: A): void {
  expect(parser.parse(input)).toMatchObject({
    type: 'ParseOK',
    value: expected,
  });
}
