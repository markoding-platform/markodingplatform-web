import { ErrorBoundary } from 'react-error-boundary';
import { DiHtml53DEffects } from 'react-icons/di';
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
import SearchHeader from 'components/SearchHeader';
import Badge from 'react-bootstrap/Badge';
import useAnnouncementCount from 'hooks/useAnnouncementCount';
import canUseDOM from 'utils/canUseDOM';
import getCookie from 'utils/getCookie';
import styles from './styles.module.scss';

const PointBadgeWrapper = ({ desktopOnly }) => {
  const { logError } = useErrorHandler();
  const notifCount = useAnnouncementCount();
  const account = canUseDOM ? JSON.parse(getCookie('userAccount')) : {};
  const { data } = useMySkilvulAccount();
  const skilvulPoint = data
    ? data.totalPoint + (account ? account.markodingPoint : 0)
    : 0;
  const skilvulBadge = data ? data.totalBadge : 0;

  return (
    <div className={desktopOnly ? 'd-none d-lg-block' : 'd-block'}>
      <div className={styles.pointBadge}>
        <div className="inner-section">
          <div className={styles.container}>
            <div className="d-flex d-lg-none align-items-center">
              <RiMedalFill size={22} />
              <span>{`${number(skilvulBadge)} MBadge`}</span>
              <RiArrowRightSLine size={22} />
            </div>
            <div className="d-flex d-lg-none align-items-center ml-4">
              <DiHtml53DEffects size={24} />
              <span>{`${number(skilvulPoint)} MPoin`}</span>
              <RiArrowRightSLine size={22} />
            </div>
            <div className="d-none d-lg-flex w-100 align-items-center ml-4">
              <SearchHeader />
            </div>
            <div className="d-none d-lg-flex align-items-center ml-4">
              <Link href="/announcement">
                <a href="/announcement">
                  <Icon
                    src={notifFill}
                    size={18}
                    className={styles.notifFillIcon}
                  >
                    {notifCount && +notifCount > 0 ? (
                      <Badge variant="danger" className="badgeNotif">
                        &nbsp;
                      </Badge>
                    ) : null}
                  </Icon>
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
