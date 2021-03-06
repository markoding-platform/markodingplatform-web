import { useCallback, useEffect, useState } from 'react';
import { shape } from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

import withAuthSync from 'hoc/withAuthSync';
import { SSO } from 'utils/auth';
import SkilvulFetch from 'libraries/SkilvulFetch';
import getCookie from 'utils/getCookie';
import canUseDOM from 'utils/canUseDOM';

import useErrorHandler from 'hooks/useErrorHandler';
import ErrorFallback from 'components/ErrorFallback';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import DashboardContainer from 'containers/Dashboard';
import { homeContent } from 'styles/home.module.scss';
import useUserDetail from 'hooks/useUserDetail';
import skilvulAccountMap from '../../map/skilvulAccountMap';

const Dashboard = ({ user }) => {
  const { logError } = useErrorHandler();

  const id = user?.id || '';
  const userXID = canUseDOM && getCookie('userXID');
  const { data, isLoading } = useUserDetail({
    url: `/users/detail/${id}`,
    isSkip: !id,
  });

  const [skilvulData, setSkilvulData] = useState({});

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  const getUserSkilvul = useCallback(async () => {
    if (userXID && userXID !== 'null') {
      const userSkilvul = await SkilvulFetch(
        `/api/skilvul?path=/users/${userXID}`
      );
      if (userSkilvul && userSkilvul.user) {
        setSkilvulData(skilvulAccountMap(userSkilvul.user));
      }
      if (userSkilvul.error) {
        return toast.error(
          <p className="m-0 pl-3">{`${userSkilvul.error}, Opps! terjadi kesalahan`}</p>,
          {
            autoClose: 3000,
          }
        );
      }
    }
  }, [userXID]);

  useEffect(() => {
    if (!id) {
      return authenticate();
    }
    if (userXID) {
      getUserSkilvul();
    }
  }, [authenticate, getUserSkilvul, id, userXID]);

  if (!id) {
    return null;
  }
  return (
    <Layout activeMenu="/idea">
      <div className={homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            {!isLoading && Object.keys(skilvulData).length > 0 && (
              <DashboardContainer
                user={user}
                name={data.name}
                bio={data.bio}
                email={data.email || ''}
                skilsBadges={skilvulData.badges || []}
                skillPoint={skilvulData.totalPoint || 0}
                markodingPoint={data.markodingPoint || 0}
                imageUrl={data.imageUrl}
              />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

Dashboard.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(Dashboard);
