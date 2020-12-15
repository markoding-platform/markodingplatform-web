import { string } from 'prop-types';
import React from 'react';
import ContentLoader from 'react-content-loader';

const Box = (props) => {
  const { height, width } = props;
  return (
    <ContentLoader height={height} width={width} {...props}>
      <rect x="16" y="17" rx="0" ry="0" width={width} height={height} />
    </ContentLoader>
  );
};

Box.defaultProps = {
  width: '100%',
  height: '420',
};

Box.propTypes = {
  width: string,
  height: string,
};
export default Box;
