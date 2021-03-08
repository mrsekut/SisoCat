import React from 'react';
import { Reditor, useReditor } from 'reditor';
import { text1 } from 'utils/dummies/texts';

// use Reditor Component
export const Reditors: React.VFC = () => {
  const reditor = useReditor({
    defaultValue: text1,
  });

  return <Reditor rstate={reditor} />;
};
