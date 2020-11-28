import dynamic from 'next/dynamic';

const DynamicHomeTopCarousel = dynamic(
  () => import(/* webpackChunkName: "Home-top-carousel" */ './HomeTopCarousel'),
  {
    loading: () => <></>, // TODO: create loader carousel, reference https://github.com/danilowoz/create-content-loader
  }
);

export default DynamicHomeTopCarousel;
