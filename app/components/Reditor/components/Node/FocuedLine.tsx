import React, { useEffect } from 'react';
import { x } from '@xstyled/styled-components';
import { cursorCol } from 'app/models/Cursor';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LineProps } from './ViewLine';
import { insertNth, range } from 'app/utils/functions';
import { focuedLineS } from 'app/models/FocuedLine';
import { parseLine, textWithIndents } from '../../utils/parsers/parser';
import { FocedNotation } from './FocuedNotation';

export const FocusedLine: React.VFC<LineProps> = ({
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

const makeChars = (value: string, cursorIndex: number) => {
  const level = textWithIndents.tryParse(value).level;
  const spaces = range(level).map(_ => ({
    type: 'space' as const,
  }));

  const indent = { type: 'indent' as const };

  const vs = [...value].map(v => ({
    type: 'value' as const,
    value: v,
  }));

  return insertNth<CharType>([...spaces, indent, ...vs], cursorIndex, {
    type: 'cursor',
  });
};
