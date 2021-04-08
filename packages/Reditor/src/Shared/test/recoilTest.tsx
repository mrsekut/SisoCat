import { renderHook } from '@testing-library/react-hooks/dom';
import React from 'react';
import { RecoilRoot } from 'recoil';

export const renderRecoilHook = <P, R>(callback: (props: P) => R) => {
  return renderHook(callback, {
    wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
  });
};
