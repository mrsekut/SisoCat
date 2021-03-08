import React from 'react';
import styled from '@xstyled/styled-components';

type Props = {
  children: React.ReactChild;
  onClick?: () => void;
  text: string;
};

export const Tooltip: React.VFC<Props> = ({ children, onClick, text }) => {
  return (
    <Wrap onClick={onClick}>
      {children}
      <span className='tip-text'>{text}</span>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  > .tip-text {
    position: absolute;
    left: 50%;
    bottom: -40px;
    padding: 5px;
    color: #fff;
    font-size: 10px;
    background: #333;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%);
    transition: 0.3s ease-in;
    &:before {
      content: '';
      position: absolute;
      top: -13px;
      left: 50%;
      margin-left: -7px;
      border: 7px solid transparent;
      border-bottom: 7px solid #333;
    }
  }

  &:hover .tip-text {
    opacity: 1;
    visibility: visible;
  }
`;
