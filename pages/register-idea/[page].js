import { useCallback } from 'react';
import { shape } from 'prop-types';

import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import RegisterIdeaSolutionContainer from 'containers/RegisterIdeaSolutionContainer';
import { SSO } from 'utils/auth';
import withAuthSync from 'hoc/withAuthSync';

const RegisterIdeaSecondPage = ({ user }) => {
  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  if (!user.id) {
    authenticate();
  }
  return (
    <Layout activeMenu="/idea">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <RegisterIdeaSolutionContainer page={2} />
        </div>
      </div>
    </Layout>
  );
};

RegisterIdeaSecondPage.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(RegisterIdeaSecondPage);
