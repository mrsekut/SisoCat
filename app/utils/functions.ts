export const deleteNthChar = (str: string, n: number) =>
  str.slice(0, n) + str.slice(n + 1);

export const insertNthChar = (str: string, n: number, c: string) =>
  str.slice(0, n) + c + str.slice(n);

export const decN = (n1: number, n2: number) => Math.max(n1 - n2, 0);

export const sum = (ns: number[]) => ns.reduce((acc, cur) => acc + cur, 0);

export const cumSumList = (ns: number[]) =>
  ns.map((sum => (value: number) => (sum += value))(0));

export const cumSumList0 = (ns: number[]) => cumSumList([0, ...ns]);

export const range = (n1: number, n2?: number) => {
  if (n2 == null) {
    return [...new Array(n1).keys()];
  }

  const start = n1;
  const end = n2;
  return [...Array(end - start + 1)].map((_, i) => start + i);
};

/**
 * 配列をn番目で分割して両方返す
 * ex. sliceWithRest([0,1,2,3,4,5], 2) // -> [[0,1], [2,3,4,5]]
 */
type Arr<T> = T[] | string;
export function sliceWithRest<T>(array: T[], n: number): [T[], T[]];
export function sliceWithRest(array: string, n: number): [string, string];
export function sliceWithRest<T>(array: Arr<T>, n: number): [Arr<T>, Arr<T>] {
  const half = array.slice(0, n);
  const rest = array.slice(n);
  return [half, rest];
}

// ref: https://stackoverflow.com/a/40808569
export const uniqBy = <T>(arr: T[], predicate: (a: T) => any = a => a): T[] => [
  ...arr
    .reduce((map, item) => {
      const key = item === null || item === undefined ? item : predicate(item);

      map.has(key) || map.set(key, item);

      return map;
    }, new Map())
    .values(),
];
