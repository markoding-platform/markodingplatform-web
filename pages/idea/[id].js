import { useCallback, useEffect } from 'react';
import { shape } from 'prop-types';

import Layout from 'components/Layout';
import withAuthSync from 'hoc/withAuthSync';
import IdeaDetails from 'containers/IdeaAndSolutionContainer/IdeaDetails';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import { homeContent } from 'styles/home.module.scss';
import { SSO } from 'utils/auth';

const IdeaDetail = ({ user }) => {
  const id = user?.id || '';

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  useEffect(() => {
    if (!id) {
      return authenticate();
    }
  }, [authenticate, id]);
  if (!id) return null;
  return (
    <Layout activeMenu="/idea">
      <div className={homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <IdeaDetails />
        </div>
      </div>
    </Layout>
  );
};

IdeaDetail.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(IdeaDetail);
