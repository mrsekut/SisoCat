import { sum, range, uniqBy, sliceWithRest } from './functions';

describe('sum', () => {
  it('calculates the sum of the list', () => {
    expect(sum([])).toEqual(0);
    expect(sum([10])).toEqual(10);
    expect(sum([0, 1, 2, 3, 4])).toEqual(10);
    expect(sum([-1, -2, -3, -4, 10])).toEqual(0);
  });
});

describe('range', () => {
  test('range', () => {
    expect(range(0)).toEqual([]);
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(3, 5)).toEqual([3, 4, 5]);
  });
});

describe('unique', () => {
  test('uniqBy', () => {
    const arr = [5, 4, 4, 4, 4, 5, 5, 3, 2, 10, 1];
    expect(uniqBy(arr)).toEqual([5, 4, 3, 2, 10, 1]);
  });
});

describe('chunks', () => {
  it('sliceWithRest', () => {
    expect(sliceWithRest([0, 1, 2, 3, 4, 5], 2)).toEqual([
      [0, 1],
      [2, 3, 4, 5],
    ]);
  });
});
