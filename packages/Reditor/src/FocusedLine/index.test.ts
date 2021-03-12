import { makeChars } from './util';

describe('makeChars', () => {
  it('cursor at 0 without spaces', () => {
    const value = 'あいうえお';
    const cursorIndex = 0; // |あいうえお
    expect(makeChars(value, cursorIndex)).toMatchObject([
      { type: 'cursor' },
      { type: 'value', value: 'あ' },
      { type: 'value', value: 'い' },
      { type: 'value', value: 'う' },
      { type: 'value', value: 'え' },
      { type: 'value', value: 'お' },
    ]);
  });

  it('cursor at 1 without spaces', () => {
    const value = 'あいうえお';
    const cursorIndex = 1;
    expect(makeChars(value, cursorIndex)).toMatchObject([
      { type: 'value', value: 'あ' },
      { type: 'cursor' },
      { type: 'value', value: 'い' },
      { type: 'value', value: 'う' },
      { type: 'value', value: 'え' },
      { type: 'value', value: 'お' },
    ]);
  });

  it('with indent', () => {
    const value = ' あいうえお';
    const cursorIndex = 2;
    expect(makeChars(value, cursorIndex)).toMatchObject([
      { type: 'indent' },
      { type: 'value', value: 'あ' },
      { type: 'cursor' },
      { type: 'value', value: 'い' },
      { type: 'value', value: 'う' },
      { type: 'value', value: 'え' },
      { type: 'value', value: 'お' },
    ]);
  });

  it('with indents', () => {
    const value = '\t\tあいうえお';
    const cursorIndex = 5;
    expect(makeChars(value, cursorIndex)).toMatchObject([
      { type: 'space' },
      { type: 'indent' },
      { type: 'value', value: 'あ' },
      { type: 'value', value: 'い' },
      { type: 'value', value: 'う' },
      { type: 'cursor' },
      { type: 'value', value: 'え' },
      { type: 'value', value: 'お' },
    ]);
  });
});
