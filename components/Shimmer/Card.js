import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = (props) => (
  <ContentLoader
    height="312"
    width="100%"
    speed={2}
    backgroundColor="#ecebeb"
    foregroundColor="#FFFFFF"
    {...props}
  >
    <rect x="0" y="233" rx="5" ry="5" width="50" height="10" />
    <rect x="0" y="260" rx="5" ry="5" width="300" height="10" />
    <rect x="0" y="210" rx="5" ry="5" width="200" height="10" />
    <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
  </ContentLoader>
);

export default CardLoader;
