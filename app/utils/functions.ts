export const deleteNthChar = (str: string, n: number) =>
  str.slice(0, n) + str.slice(n + 1);

export const insertNthChar = (str: string, n: number, c: string) =>
  str.slice(0, n) + c + str.slice(n);

export const insertNth = <T>(vs: T[], n: number, v: T) =>
  vs.slice(0, n).concat([v]).concat(vs.slice(n));

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

export const timeSince = (date: number) => {
  const curDate = new Date().getTime();
  const seconds = Math.floor((curDate - date) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  const perYear = seconds / year;
  if (perYear / year > 1) {
    return Math.floor(perYear) + ' years';
  }

  const perMonth = seconds / month;
  if (perMonth > 1) {
    return Math.floor(perMonth) + ' months';
  }

  const perDay = seconds / day;
  if (perDay > 1) {
    return Math.floor(perDay) + ' days';
  }

  const perHour = seconds / hour;
  if (perHour > 1) {
    return Math.floor(perHour) + ' hours';
  }

  const perMinute = seconds / 60;
  if (perMinute > 1) {
    return Math.floor(perMinute) + ' minutes';
  }

  return Math.floor(seconds) + ' seconds';
};
