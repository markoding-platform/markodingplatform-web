import { useCallback, useEffect } from 'react';
import { shape } from 'prop-types';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import RegisterIdeaSolutionContainer from 'containers/AddAndEditIdea';
import { homeContent } from 'styles/home.module.scss';
import { SSO } from 'utils/auth';

import withAuthSync from 'hoc/withAuthSync';
import useMarkodingSubmission from 'hooks/useMarkodingSubmission';

const RegisterIdea = ({ user }) => {
  const router = useRouter();
  const id = user?.id || '';
  const { profileType = '' } = user?.profile || {};
  const { isOpenSubmission } = useMarkodingSubmission();

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  useEffect(() => {
    // TODO need to find better approach to protecting routes
    if (!id) {
      authenticate();
    }
    if (profileType !== 'student') {
      router.push('/');
    }
    if (!isOpenSubmission) {
      router.push('/');
    }
  }, [authenticate, id, isOpenSubmission, profileType, router]);

  if (!id || !isOpenSubmission) {
    return null;
  }

  return (
    <Layout activeMenu="/idea">
      <div className={homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <RegisterIdeaSolutionContainer user={user} />
        </div>
      </div>
    </Layout>
  );
};

RegisterIdea.propTypes = {
  user: shape({
    profile: shape({}),
    id: '',
    name: '',
  }).isRequired,
};

export default withAuthSync(RegisterIdea);
