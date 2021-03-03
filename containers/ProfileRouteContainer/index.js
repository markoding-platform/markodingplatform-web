import dynamic from 'next/dynamic';
import Loading from 'components/Loading';
import React from 'react';

const DynamicProfileRouteContainer = dynamic(
  () => import(/* webpackChunkName: "profile-container" */ './Container'),
  {
    loading: () => <Loading />,
  }
);

export default DynamicProfileRouteContainer;
