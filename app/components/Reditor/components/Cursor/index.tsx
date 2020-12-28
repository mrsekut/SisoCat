import React from 'react';
import styled from 'styled-components';
import { CursorPos } from '../../hooks/useCursor';
import { textStyle } from '../../utils/settings';

type Props = {
  cursorPos: CursorPos;
};

export const Cursor: React.FC<Props> = ({ cursorPos }) => {
  return (
    <Wrap cursorPos={cursorPos}>
      <Carret />
      {/* <Textarea cursorPos={cursorPos} /> */}
    </Wrap>
  );
};

const Wrap = styled.div<{ cursorPos: CursorPos }>(
  p => `
  position: absolute;
  top: ${p.cursorPos.top}px;
  left: ${p.cursorPos.left}px;
  height: ${textStyle.lineHeight}px;
`,
);

// const Textarea = styled.textarea<{ position: Position }>(p => ` `);

const Carret = styled.div`
  height: ${textStyle.lineHeight}px;
  width: 1px;
  font-size: ${textStyle.fontSize}px;

  background-color: red;
  line-height: ${textStyle.lineHeight}px;
  letter-spacing: 0px;
  display: block;
  visibility: inherit;
`;
