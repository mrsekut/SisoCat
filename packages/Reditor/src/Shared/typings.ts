/**
 * line, column
 * e.g. `hog|ehoge`の時, (0,3)
 */
export type Pos = {
  ln: Ln; // 0始まり、0行目, 1行目,..
  col: number; // 0始まり. 0文字目の左, 1文字目の左,..
};

export type Ln = Branded<number, 'ln'>;
export const Ln = (n: number) => n as Ln;

export type Branded<T, U extends string> = T & { [key in U]: never };
