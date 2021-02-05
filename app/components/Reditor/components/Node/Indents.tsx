import React from 'react';
import styled from '@xstyled/styled-components';
import { range } from 'app/utils/functions';
import { textStyle } from '../../utils/settings';

type Props = {
  level: number;
};

export const Indents: React.FC<Props> = ({ level }) => {
  if (level === 0) {
    return <></>;
  }

  return (
    <>
      {range(level - 1).map(_ => (
        <Space />
      ))}
      <Dot />
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

const Dot = styled.span`
  position: relative;
  padding-left: ${textStyle.fontSize}px;
  :before {
    content: '';
    position: absolute;
    top: 0.3em;
    left: 0;
    width: 8px;
    height: 8px;
    background-color: #000;
    border-radius: 50%;
  }
`;
