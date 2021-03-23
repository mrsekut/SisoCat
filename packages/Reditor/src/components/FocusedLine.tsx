import React, { useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LineProps } from './ViewLine';
import { FocusedNotation } from './FocusedNotation';
import { cursorColS } from '../Cursor';
import { focuedLineS } from '../FocusedLine';
import { parseLine } from '../Shared/parsers';
import { textStyle } from '../Shared/settings';
import { Empty } from './Empty';
import { makeChars } from '../FocusedLine';

type Props = LineProps;

export const FocusedLine: React.VFC<Props> = ({ value: defaultValue, ln }) => {
  const col = useRecoilValue(cursorColS);
  const [value, setValue] = useRecoilState(focuedLineS);

  useEffect(() => {
    setValue(parseLine(defaultValue, ln).line.text);
  }, []);

  return (
    <x.div display='flex' h={`${textStyle.lineHeight}px`}>
      {makeChars(value, col).map((char, index) => (
        <FocusedNotation charType={char} index={index} ln={ln} />
      ))}

      <Empty pos={{ ln, col: value.length }} />
    </x.div>
  );
};
