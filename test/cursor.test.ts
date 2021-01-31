import { cursorUpDown } from 'app/models/Cursor';

describe('note', () => {
  it('cursorUpDown', () => {
    const curLeft = 9 + 9;
    const widths = [10, 10, 10, 10, 10, 10, 10, 10];
    expect(cursorUpDown(curLeft, widths)).toMatchObject({ col: 1, left: 10 });
  });

  it('cursorUpDown', () => {
    const curLeft = 9;
    const ns = [10, 10, 10, 10, 10, 10, 10, 10];
    expect(cursorUpDown(curLeft, ns)).toMatchObject({ col: 0, left: 0 });
  });

  it('cursorUpDown', () => {
    const curLeft = 25;
    const ns = [10, 10, 10, 10, 10, 10, 10, 10];
    expect(cursorUpDown(curLeft, ns)).toMatchObject({ col: 2, left: 20 });
  });
});
