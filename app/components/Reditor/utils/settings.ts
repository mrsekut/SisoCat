import { CSSProp } from 'styled-components';

// css prop of styled-compnents
declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}

export const textStyle = {
  lineHeight: 24,
  fontSize: 16,
};
