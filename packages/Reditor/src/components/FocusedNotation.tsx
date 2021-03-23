import React from 'react';
import { CharType } from '../FocusedLine';
import { Char } from './Char';
import { Cursor } from './Cursor';
import { Space } from './Space';
import { Triangle } from './Triangle';

type Props = {
  charType: CharType;
  index: number;
  ln: number;
};

export const FocusedNotation: React.VFC<Props> = ({ charType, index, ln }) => {
  switch (charType.type) {
    case 'value':
      return (
        <Char key={index} pos={{ ln, col: index }}>
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
