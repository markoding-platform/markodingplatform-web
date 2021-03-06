import { useCallback, useEffect, useState } from 'react';
import { shape } from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Loading from 'components/Loading';
import SkilvulFetch from 'libraries/SkilvulFetch';
import getCookie from 'utils/getCookie';
import canUseDOM from 'utils/canUseDOM';
import { SSO } from 'utils/auth';
import ProfileContainer from 'containers/Profile';
import useErrorHandler from 'hooks/useErrorHandler';
import ErrorFallback from 'components/ErrorFallback';
import Layout from 'components/Layout';
import useUserDetail from 'hooks/useUserDetail';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import { homeContent } from 'styles/home.module.scss';

const Profile = ({ user }) => {
  const { push } = useRouter();
  const { logError } = useErrorHandler();
  const id = user?.id || '';
  const profile = user?.profile || {};
  const userXID = canUseDOM && getCookie('userXID');
  const { data, isLoading } = useUserDetail({
    url: `/users/detail/${id}`,
    isSkip: !id,
  });

  const [errorGetSkilvulUser, setErrorGetSkilvulUser] = useState(false);

  const [skilvulData, setSkilvulData] = useState({});

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  const renderErrorToast = (errMsg) =>
    toast.error(<p className="m-0 pl-3">{errMsg}</p>, { autoClose: 5000 });

  const getUserSkilvul = useCallback(async () => {
    if (userXID && userXID !== 'null') {
      const userSkilvul = await SkilvulFetch(
        `/api/skilvul?path=/users/${userXID}`
      );
      if (userSkilvul && userSkilvul.user) {
        return setSkilvulData(userSkilvul.user);
      }
    }
    setErrorGetSkilvulUser(true);
    renderErrorToast('Ooops!, terjadi kesalahan. Mohon coba lagi');
  }, [userXID]);

  useEffect(() => {
    if (!id) {
      return authenticate();
    }
    if (!profile?.profileType) {
      return push('/signup');
    }
    if (userXID) {
      getUserSkilvul();
    }
  }, [authenticate, getUserSkilvul, id, profile?.profileType, push, userXID]);

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
            <div style={{ 'min-height': '500px' }}>
              {!isLoading &&
                !errorGetSkilvulUser &&
                Object.keys(skilvulData).length > 0 && (
                  <ProfileContainer
                    user={user}
                    firstName={skilvulData.firstName || ''}
                    lastName={skilvulData.lastName || ''}
                    email={skilvulData.email || ''}
                    userXID={skilvulData.id}
                    gender={skilvulData.gender || ''}
                    birthDate={skilvulData.birthDate || ''}
                    profession={skilvulData.profession || ''}
                    province={skilvulData.province || {}}
                    city={skilvulData.city || {}}
                    imageUrl={data.imageUrl}
                  />
                )}
              {!errorGetSkilvulUser &&
                Object.keys(skilvulData).length === 0 && <Loading />}
            </div>
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

export default Profile;
