export const deleteNthChar = (str: string, n: number) =>
  str.slice(0, n) + str.slice(n + 1);

export const decN = (n1: number, n2: number) => Math.max(n1 - n2, 0);

export const sum = (ns: number[]) => ns.reduce((acc, cur) => acc + cur, 0);
