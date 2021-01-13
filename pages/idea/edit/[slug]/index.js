import { useCallback, useEffect } from 'react';
import { shape } from 'prop-types';

import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import EditIdeaSolutionContainer from 'containers/RegisterIdeaSolutionContainer';

import { homeContent } from 'styles/home.module.scss';
import withAuthSync from 'hoc/withAuthSync';
import { SSO } from 'utils/auth';

const EditIdea = ({ user }) => {
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
          <EditIdeaSolutionContainer user={user} />
        </div>
      </div>
    </Layout>
  );
};

EditIdea.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(EditIdea);
