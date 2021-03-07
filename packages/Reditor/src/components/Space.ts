import styled from '@xstyled/styled-components';
import { textStyle } from '../Shared/utils/settings';

export const Space = styled.span`
  position: relative;
  padding-left: ${textStyle.fontSize}px;
  :before {
    content: '';
    position: absolute;
    top: 0.3em;
    left: 0;
    width: 8px;
    height: 8px;
  }
`;
