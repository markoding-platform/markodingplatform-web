import { string } from 'prop-types';
import Link from 'next/link';

import dicLogo from 'public/assets/dic-wrapped-logo.png';

const DicLogo = ({ className, width, height }) => (
  <Link href="/" className={className}>
    <a>
      <img
        src={dicLogo}
        style={{ width, height }}
        alt="digital innovation challenge logo"
      />
    </a>
  </Link>
);

DicLogo.defaultProps = {
  className: undefined,
  width: '242px',
  height: 'auto',
};

DicLogo.propTypes = {
  className: string,
  width: string,
  height: string,
};

export default DicLogo;
