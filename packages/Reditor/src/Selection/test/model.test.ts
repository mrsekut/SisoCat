import { sortPos, getSelectedLines, inSelection } from '../model';

describe('sortPos', () => {
  it('same line', () => {
    const pos1 = { ln: 0, col: 4 };
    const pos2 = { ln: 0, col: 10 };
    expect(sortPos(pos1, pos2)).toStrictEqual([pos1, pos2]);
  });

  it('same line', () => {
    const pos1 = { ln: 0, col: 10 };
    const pos2 = { ln: 0, col: 4 };
    expect(sortPos(pos1, pos2)).toStrictEqual([pos2, pos1]);
  });

  it('different line', () => {
    const pos1 = { ln: 0, col: 4 };
    const pos2 = { ln: 1, col: 10 };
    expect(sortPos(pos1, pos2)).toStrictEqual([pos1, pos2]);
  });

  it('different line', () => {
    const pos1 = { ln: 1, col: 10 };
    const pos2 = { ln: 0, col: 4 };
    expect(sortPos(pos1, pos2)).toStrictEqual([pos2, pos1]);
  });

  it('different line', () => {
    const pos1 = { ln: 1, col: 2 };
    const pos2 = { ln: 0, col: 4 };
    expect(sortPos(pos1, pos2)).toStrictEqual([pos2, pos1]);
  });

  it('equal pos', () => {
    const pos1 = { ln: 1, col: 1 };
    const pos2 = { ln: 1, col: 1 };
    expect(sortPos(pos1, pos2)).toStrictEqual([pos1, pos2]);
  });
});

describe('getSelection', () => {
  it('same line', () => {
    const lines = ['abcdef'];
    const start = { ln: 0, col: 4 };
    const end = { ln: 0, col: 2 };
    expect(getSelectedLines(start, end, lines)).toMatchObject(['cd']);
  });

  it('multiple lines', () => {
    const lines = ['abcdefg', 'hijklmn'];
    const start = { ln: 0, col: 4 };
    const end = { ln: 1, col: 2 };
    expect(getSelectedLines(start, end, lines)).toMatchObject(['efg', 'hi']);
  });

  it('multiple lines', () => {
    const lines = ['abcdefg', 'xxxxxxx', 'hijklmn'];
    const start = { ln: 0, col: 4 };
    const end = { ln: 2, col: 2 };
    expect(getSelectedLines(start, end, lines)).toMatchObject([
      'efg',
      'xxxxxxx',
      'hi',
    ]);
  });
});

describe('inSelection', () => {
  it('same line', () => {
    const pos = { ln: 0, col: 3 };
    const selection = { start: { ln: 0, col: 0 }, end: { ln: 0, col: 5 } };
    expect(inSelection(pos, selection)).toBe(true);
  });

  it('equal', () => {
    const pos = { ln: 0, col: 3 };
    const selection = { start: { ln: 0, col: 0 }, end: { ln: 0, col: 3 } };
    expect(inSelection(pos, selection)).toBe(true);
  });

  it('different line', () => {
    const pos = { ln: 1, col: 4 };
    const selection = { start: { ln: 0, col: 4 }, end: { ln: 2, col: 4 } };
    expect(inSelection(pos, selection)).toBe(true);
  });

  it('different line', () => {
    const pos = { ln: 0, col: 4 };
    const selection = { start: { ln: 0, col: 3 }, end: { ln: 2, col: 4 } };
    expect(inSelection(pos, selection)).toBe(true);
  });

  it('exists outside', () => {
    const pos = { ln: 3, col: 4 };
    const selection = { start: { ln: 0, col: 3 }, end: { ln: 2, col: 4 } };
    expect(inSelection(pos, selection)).toBe(false);
  });

  it('exists outside', () => {
    const pos = { ln: 0, col: 2 };
    const selection = { start: { ln: 0, col: 3 }, end: { ln: 2, col: 4 } };
    expect(inSelection(pos, selection)).toBe(false);
  });

  it('exists outside', () => {
    const pos = { ln: 2, col: 5 };
    const selection = { start: { ln: 0, col: 3 }, end: { ln: 2, col: 4 } };
    expect(inSelection(pos, selection)).toBe(false);
  });
});
