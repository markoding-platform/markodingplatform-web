import dynamic from 'next/dynamic';
import Loading from 'components/Loading';
import React from 'react';

const DynamicTermsContainer = dynamic(
  () => import(/* webpackChunkName: "terms-container" */ './Container'),
  {
    loading: () => <Loading />,
  }
);

export default DynamicTermsContainer;
