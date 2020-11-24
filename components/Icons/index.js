import React from 'react';
import { string, number } from 'prop-types';
import { iconWrapper } from './style.module.scss';

const Icon = ({ src, size, className, ...props }) => {
  return (
    <i
      className={`${iconWrapper} ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        width: `${size > 0 ? size : '40'}px`,
        height: `${size > 0 ? size : '40'}px`,
      }}
      {...props}
    />
  );
};

Icon.propTypes = {
  className: string,
  size: number,
  src: string.isRequired,
};

Icon.defaultProps = {
  className: '',
  size: 0,
};

export default Icon;
