import Form from 'react-bootstrap/Form';
import { ErrorBoundary } from 'react-error-boundary';
import { DiHtml53DEffects } from 'react-icons/di';
import { BiSearchAlt2 } from 'react-icons/bi';
import { RiArrowRightSLine, RiMedalFill } from 'react-icons/ri';
import Link from 'next/link';
import useErrorHandler from 'hooks/useErrorHandler';
import ErrorFallback from 'components/ErrorFallback';
import AuthButton from 'components/AuthButton';
import notifFill from 'svgs/notif-fill.svg';
import Icon from 'components/Icons';
import PropTypes from 'prop-types';
import useMySkilvulAccount from 'hooks/useMySkilvulAccount';
import number from 'utils/number';
import styles from './styles.module.scss';

const PointBadgeWrapper = ({ desktopOnly }) => {
  const { logError } = useErrorHandler();
  const account = useMySkilvulAccount();
  const totalBadge = account && account.totalBadge ? account.totalBadge : 0;
  const totalPoint = account && account.totalPoint ? account.totalPoint : 0;
  return (
    <div className={desktopOnly ? 'd-none d-lg-block' : 'd-block'}>
      <div className={styles.pointBadge}>
        <div className="inner-section">
          <div className={styles.container}>
            <div className="d-flex d-lg-none align-items-center">
              <RiMedalFill size={22} />
              <span>{`${number(totalBadge)} MBadge`}</span>
              <RiArrowRightSLine size={22} />
            </div>
            <div className="d-flex d-lg-none align-items-center ml-4">
              <DiHtml53DEffects size={24} />
              <span>{`${number(totalPoint)} MPoin`}</span>
              <RiArrowRightSLine size={22} />
            </div>
            <div className="d-none d-lg-flex w-100 align-items-center ml-4">
              <div className={styles.searchGroup}>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className={styles.search}
                />
                <BiSearchAlt2 className={styles.searchIcon} />
              </div>
            </div>
            <div className="d-none d-lg-flex align-items-center ml-4">
              <Link href="/announcement">
                <a href="/announcement">
                  <Icon
                    src={notifFill}
                    size={18}
                    className={styles.notifFillIcon}
                  />
                </a>
              </Link>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={logError}
              >
                <AuthButton />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PointBadgeWrapper.defaultProps = {
  desktopOnly: false,
};

PointBadgeWrapper.propTypes = {
  desktopOnly: PropTypes.bool,
};

export default PointBadgeWrapper;
