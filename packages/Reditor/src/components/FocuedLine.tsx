import React, { useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LineProps } from './ViewLine';
import { FocedNotation } from './FocuedNotation';
import { cursorCol } from '../Cursor/model';
import { focuedLineS } from '../FocusedLine/model';
import { insertNth, range } from '../Shared/functions';
import { parseLine, textWithIndents } from '../Shared/parsers';
import { textStyle } from '../Shared/settings';
import { Empty } from './Empty';

type Props = LineProps;

export const FocusedLine: React.VFC<Props> = ({
  value: defaultValue,
  lineIndex,
}) => {
  const col = useRecoilValue(cursorCol);
  const [value, setValue] = useRecoilState(focuedLineS);

  useEffect(() => {
    setValue(parseLine(defaultValue, lineIndex).line.text);
  }, []);

  return (
    <x.div display='flex' h={`${textStyle.lineHeight}px`}>
      {makeChars(value, col).map((char, index) => (
        <FocedNotation charType={char} index={index} lineIndex={lineIndex} />
      ))}

      <Empty pos={{ ln: lineIndex, col: value.length }} />
    </x.div>
  );
};

// -------------------------------------------------------------------------------------
// util
// -------------------------------------------------------------------------------------

export type CharType =
  | { type: 'value'; value: string }
  | { type: 'cursor' }
  | { type: 'space' }
  | { type: 'indent' };

export const makeChars = (value: string, cursorIndex: number) => {
  const { level, value: v } = textWithIndents.tryParse(value);

  const cs = [...v].map(v => ({
    type: 'value' as const,
    value: v,
  }));

  return insertNth<CharType>([...spaces(level), ...cs], cursorIndex, {
    type: 'cursor',
  });
};

const spaces = (level: number) => {
  if (level === 0) {
    return [];
  }

  const spaces = range(level - 1).map(_ => ({
    type: 'space' as const,
  }));
  const indent = { type: 'indent' as const };

  return [...spaces, indent];
};
