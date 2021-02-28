import React from 'react';
import { Reditor, useReditor } from '../Reditor';
import { text1 } from '../Reditor/utils/dummies/texts';

// use Reditor Component
export const Reditors: React.VFC = () => {
  const reditor = useReditor({
    defaultValue: text1,
  });

  return <Reditor rstate={reditor} />;
};
