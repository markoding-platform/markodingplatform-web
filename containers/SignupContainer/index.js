import dynamic from 'next/dynamic';
import Loading from 'components/Loading';
import React from 'react';

const DynamicSignupContainer = dynamic(
  () => import(/* webpackChunkName: "signup-container" */ './Container'),
  {
    loading: () => <Loading />,
  }
);

export default DynamicSignupContainer;
