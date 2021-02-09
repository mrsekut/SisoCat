import styled from '@xstyled/styled-components';
import React, { useState } from 'react';

type Props = {
  init: boolean;
};

export const Expand: React.FC<Props> = ({ init = false, children }) => {
  const [isOpen, setOpen] = useState(init);
  return (
    <Wrap isOpen={isOpen} onClick={() => setOpen(o => !o)}>
      {children}
    </Wrap>
  );
};

const Wrap = styled.div<{ isOpen: boolean }>`
  transition: height 0.5s;
  height: ${p => (p.isOpen ? 500 : 200)}px;
`;
