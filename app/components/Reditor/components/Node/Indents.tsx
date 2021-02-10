import React, { useState } from 'react';
import styled, { css } from '@xstyled/styled-components';
import { range } from 'app/utils/functions';
import { textStyle } from '../../utils/settings';

type Props = {
  level: number;
};

export const Indents: React.FC<Props> = ({ level }) => {
  const [isOpen, setOpen] = useState(true);

  if (level === 0) {
    return <></>;
  }

  return (
    <>
      {range(level - 1).map(_ => (
        <Space />
      ))}
      <Triangle isOpen={isOpen} onClick={() => setOpen(e => !e)} />
    </>
  );
};

const Space = styled.span`
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

const Triangle = styled.button<{ isOpen: boolean }>`
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
