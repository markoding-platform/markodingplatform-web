import React from 'react';
import CardLoader from 'components/Shimmer/Card';
import range from 'utils/range';

const loaderArr = [];
range(1, 3).forEach((item) => {
  loaderArr.push(<CardLoader key={item} style={{ margin: '5px' }} />);
});

const WidgetLoader = () => {
  return <div className="d-flex justify-content-between">{loaderArr}</div>;
};

export default WidgetLoader;
