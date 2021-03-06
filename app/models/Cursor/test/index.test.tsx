import { makeChars } from 'app/components/Reditor/components/Node/FocuedLine';
import { cursorUpDown } from '../utils';

describe('cursorUpDown', () => {
  it('10 or 20', () => {
    const curLeft = 18;
    const widths = [10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 2, left: 20 });
  });

  it('0 or 10', () => {
    const curLeft = 9;
    const widths = [10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 1, left: 10 });
  });

  it('rounding: 20 or 30', () => {
    const curLeft = 25;
    const widths = [10, 10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 3, left: 30 });
  });

  it('0 or 10', () => {
    const curLeft = 3;
    const widths = [10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 0, left: 0 });
  });

  it('If the upper limit is exceeded, move to the end', () => {
    const curLeft = 45;
    const widths = [10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 2, left: 20 });
  });

  it('is at the beginning', () => {
    const curLeft = 0;
    const widths = [10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 0, left: 0 });
  });

  it('is at the end of the line', () => {
    const curLeft = 50;
    const widths = [10, 10];
    expect(cursorUpDown(curLeft, widths, true)).toMatchObject({
      col: 0,
      left: 0,
    });
  });

  it('is empty:', () => {
    const curLeft = 10;
    const widths: number[] = [];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 0, left: 0 });
  });
});

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
