import React from 'react';
import { Reditor, useReditor } from 'reditor';
// import { text1 } from '../Reditor/utils/dummies/texts';

// use Reditor Component
export const Reditors: React.VFC = () => {
  const reditor = useReditor({
    defaultValue: ['wwwww'],
  });

  return <Reditor rstate={reditor} />;
};
