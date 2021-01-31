import dynamic from 'next/dynamic';
import Loading from 'components/Loading';
import React from 'react';

const DynamicProfileContainer = dynamic(
  () => import(/* webpackChunkName: "profile-container" */ './Container'),
  {
    loading: () => <Loading />,
  }
);

export default DynamicProfileContainer;
