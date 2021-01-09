import { DefaultTheme as XStyledDefaultTheme } from '@xstyled/styled-components';

export const textStyle = {
  lineHeight: 24,
  fontSize: 16,
};

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends XStyledDefaultTheme {
    /* Customize your theme */
  }
}
