import { sortPos, getSelectedLines } from '../model';

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
