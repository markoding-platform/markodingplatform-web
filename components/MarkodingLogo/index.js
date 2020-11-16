import PropTypes from 'prop-types';
import Link from 'next/link';

import markodingLogo from 'public/assets/markoding-logo-min.png';
import { logo, smallLogo } from './styles.module.scss';

const MarkodingLogo = ({ isSmall }) => (
  <Link href="/">
    <a>
      <img
        src={markodingLogo}
        className={isSmall ? smallLogo : logo}
        alt="markoding logo"
      />
    </a>
  </Link>
);

MarkodingLogo.defaultProps = {
  isSmall: false,
};

MarkodingLogo.propTypes = {
  isSmall: PropTypes.bool,
};

export default MarkodingLogo;
