import React from 'react';
import { Reditor, useReditor } from 'reditor';
// import { text1 } from '../Reditor/utils/dummies/texts';

export const text1: Text = [
  '[Json]の正規化',
  '\t[Json]は[正規化]するのが良い',
  '\t正規化は[** よいこと]ばかり',
  '[CUE]も良い感じらしい',
];

// use Reditor Component
export const Reditors: React.VFC = () => {
  const reditor = useReditor({
    defaultValue: text1,
  });

  return <Reditor rstate={reditor} />;
};
