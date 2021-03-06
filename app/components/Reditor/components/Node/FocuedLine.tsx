import React, { useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { cursorCol } from 'app/models/Cursor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LineProps } from './ViewLine';
import { insertNth, range } from 'app/utils/functions';
import { focuedLineS } from 'app/models/FocuedLine';
import { parseLine, textWithIndents } from '../../utils/parsers/parser';
import { FocedNotation } from './FocuedNotation';

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
    <x.div>
      {makeChars(value, col).map((char, index) => (
        <FocedNotation charType={char} index={index} lineIndex={lineIndex} />
      ))}
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
