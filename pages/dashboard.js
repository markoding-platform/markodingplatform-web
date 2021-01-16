import { useCallback, useEffect } from 'react';
import { shape } from 'prop-types';

import withAuthSync from 'hoc/withAuthSync';
import { SSO } from 'utils/auth';

import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import DashboardContainer from 'containers/Dashboard';
import { homeContent } from 'styles/home.module.scss';

const Dashboard = ({ user }) => {
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
          <DashboardContainer user={user} />
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
