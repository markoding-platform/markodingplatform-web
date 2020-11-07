import React from 'react';

import markodingLogo from '../../assets/markoding-logo-min.png';
import { logo } from './styles.module.scss';

const MarkodingLogo = () => (
  <img src={markodingLogo} className={logo} alt="markoding logo" />
);

export default MarkodingLogo;
