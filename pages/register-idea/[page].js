import { useCallback, useEffect } from 'react';
import { shape } from 'prop-types';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import RegisterIdeaSolutionContainer from 'containers/AddAndEditIdea';
import { SSO } from 'utils/auth';
import withAuthSync from 'hoc/withAuthSync';
import { homeContent } from 'styles/home.module.scss';

const RegisterIdeaSecondPage = ({ user }) => {
  const router = useRouter();
  const id = user?.id || '';
  const { profileType = '' } = user?.profile;

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  useEffect(() => {
    if (!id) {
      authenticate();
    }
    if (profileType === 'teacher') {
      router.push('/');
    }
  }, [authenticate, id, profileType, router]);

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
