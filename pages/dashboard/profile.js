import { useCallback, useEffect, useState } from 'react';
import { shape } from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';

import SkilvulFetch from 'libraries/SkilvulFetch';
import getCookie from 'utils/getCookie';
import withAuthSync from 'hoc/withAuthSync';
import canUseDOM from 'utils/canUseDOM';
import { SSO } from 'utils/auth';
import ProfileContainer from 'containers/Profile';
import useErrorHandler from 'hooks/useErrorHandler';
import ErrorFallback from 'components/ErrorFallback';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import { homeContent } from 'styles/home.module.scss';

const Profile = ({ user }) => {
  const { logError } = useErrorHandler();
  const id = user?.id || '';
  const userXID = canUseDOM && getCookie('userXID');

  const [skilvulData, setSkilvulData] = useState();

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  const getUserSkilvul = useCallback(async () => {
    const userSkilvul = await SkilvulFetch(
      `/api/skilvul?path=/users/${userXID}`
    );
    if (userSkilvul && userSkilvul.user) {
      setSkilvulData(userSkilvul.user);
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

  console.log({ skilvulData });
  return (
    <Layout activeMenu="/idea">
      <div className={homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
            {skilvulData ? (
              <ProfileContainer
                user={user}
                firstName={skilvulData.firstName || ''}
                lastName={skilvulData.lastName || ''}
                email={skilvulData.email || ''}
                userXID={userXID}
                gender={skilvulData.gender || ''}
                birthDate={skilvulData.birthDate || ''}
              />
            ) : (
              <></>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

Profile.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(Profile);
