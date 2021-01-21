import { string } from 'prop-types';
import Link from 'next/link';

import markodingLogo from 'public/assets/markoding-logo-min.png';

const MarkodingLogo = ({ className, width, height }) => (
  <Link href="/" className={className}>
    <a href="/">
      <img src={markodingLogo} style={{ width, height }} alt="markoding logo" />
    </a>
  </Link>
);

MarkodingLogo.defaultProps = {
  className: undefined,
  width: '242px',
  height: '40px',
};

MarkodingLogo.propTypes = {
  className: string,
  width: string,
  height: string,
};

export default MarkodingLogo;
