import PropTypes from 'prop-types';
import React from 'react';
import markodingLogo from '../../assets/markoding-logo-min.png';
import { logo, smallLogo } from './styles.module.scss';

const MarkodingLogo = ({ isSmall }) => (
  <img src={markodingLogo} className={isSmall ? smallLogo : logo} alt="markoding logo" />
);

MarkodingLogo.defaultProps = {
	isSmall: false
};

MarkodingLogo.propTypes = {
	isSmall: PropTypes.bool
};

export default MarkodingLogo;
