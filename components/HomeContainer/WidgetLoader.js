import React from 'react';
import CardLoader from 'components/Shimmer/Card';

const WidgetLoader = () => {
  const loaderArr = [];
  const renderLoader = () => {
    for (let i = 0; i < 3; i += 1) {
      loaderArr.push(<CardLoader />);
    }
  };
  return renderLoader();
};

export default WidgetLoader;
