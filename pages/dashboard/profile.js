import { useCallback, useEffect } from 'react';
import { shape } from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';

import withAuthSync from 'hoc/withAuthSync';
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

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  useEffect(() => {
    if (!id) {
      authenticate();
    }
  }, [authenticate, id]);

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
            <ProfileContainer user={user} />
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
