/**
 * line, column
 * e.g. `hog|ehoge`の時, (0,3)
 */
export type Pos = {
  ln: number; // 0始まり、0行目, 1行目,..
  col: number; // 0始まり. 0文字目の左, 1文字目の左,..
};
