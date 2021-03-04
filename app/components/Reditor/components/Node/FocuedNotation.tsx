import React from 'react';
import { Cursor } from '../Cursor';
import { Char } from './Char';
import { CharType } from './FocuedLine';
import { Space } from './Space';
import { Triangle } from './Triangle';

type Props = {
  charType: CharType;
  index: number;
  lineIndex: number;
};

export const FocedNotation: React.VFC<Props> = ({
  charType,
  index,
  lineIndex,
}) => {
  switch (charType.type) {
    case 'value':
      return (
        <Char key={index} pos={{ ln: lineIndex, col: index }}>
          {charType.value}
        </Char>
      );
    case 'cursor':
      return <Cursor />;
    case 'space':
      return <Space key={index} />;
    case 'indent':
      return <Triangle isOpen={true} />;
  }
};
