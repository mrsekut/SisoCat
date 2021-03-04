import styled, { css } from '@xstyled/styled-components';

export const Triangle = styled.button<{ isOpen: boolean }>`
  ${p => (p.isOpen ? Down : Right)}
  outline: none;
`;

const Right = css`
  width: 0;
  height: 0;
  padding: 0px;

  border-style: solid;
  border-width: 5px 0 5px 8.7px;
  border-color: transparent transparent transparent #000000;

  margin: -3px 3px 0px 3px;
  vertical-align: middle;
`;

const Down = css`
  width: 0;
  height: 0;
  padding: 0px;

  border-style: solid;
  border-width: 8.7px 5px 0 5px;
  border-color: #000000 transparent transparent transparent;

  margin: 0px 3px;
`;
