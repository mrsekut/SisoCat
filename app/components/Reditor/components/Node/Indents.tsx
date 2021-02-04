import React from 'react';
import styled from '@xstyled/styled-components';
import { range } from 'app/utils/functions';

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
      <Indent />
    </>
  );
};

const Space = styled.span`
  position: relative;
  padding-left: 16px;
  :before {
    content: '';
    position: absolute;
    top: 0.3em;
    left: 0;
    width: 8px;
    height: 8px;
  }
`;

const Indent = styled.span`
  position: relative;
  padding-left: 16px;
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
