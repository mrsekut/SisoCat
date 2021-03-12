import { insertNth, range } from '../Shared/functions';
import { textWithIndents } from '../Shared/parsers';

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
