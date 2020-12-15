import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import React from 'react';

const Loading = ({ text, withText, size, variant }) => {
  return (
    <div className="d-flex align-items-center">
      <Spinner
        as="span"
        animation="grow"
        size={size}
        role="status"
        aria-hidden="true"
        variant={variant}
      />
      {withText && <span className="ml-2">{text}</span>}
    </div>
  );
};

Loading.defaultProps = {
  text: 'Sedang memuat...',
  withText: true,
  size: 'sm',
  variant: 'dark',
};

Loading.propTypes = {
  text: PropTypes.string,
  withText: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default Loading;
