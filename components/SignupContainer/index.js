import dynamic from 'next/dynamic';

const DynamicSignupContainer = dynamic(
  () => import(/* webpackChunkName: "signup-container" */ './Container'),
  {
    loading: () => <></>, // TODO: create loader carousel, reference https://github.com/danilowoz/create-content-loader
  }
);

export default DynamicSignupContainer;
