// FIXME: このファイル自体の置き場所がおかしい
export const deleteNthChar = (str: string, n: number) =>
  str.slice(0, n) + str.slice(n + 1);

export const decN = (n1: number, n2: number) => Math.max(n1 - n2, 0);

export const sum = (ns: number[]) => ns.reduce((acc, cur) => acc + cur, 0);

export const range = (n1: number, n2?: number) => {
  if (n2 == null) {
    return [...new Array(n1).keys()];
  }

  const start = n1;
  const end = n2;
  return [...Array(end - start + 1)].map((_, i) => start + i);
};
