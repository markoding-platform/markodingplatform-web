import { useCallback, useEffect } from 'react';
import { shape } from 'prop-types';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import EditIdeaSolutionContainer from 'containers/AddAndEditIdea';

import { homeContent } from 'styles/home.module.scss';
import withAuthSync from 'hoc/withAuthSync';
import { SSO } from 'utils/auth';
import useMarkodingSubmission from 'hooks/useMarkodingSubmission';

const EditIdea = ({ user }) => {
  const router = useRouter();
  const id = user?.id || '';
  const { isOpenSubmission } = useMarkodingSubmission();

  const authenticate = useCallback(async () => {
    await SSO();
  }, []);

  useEffect(() => {
    if (!id) {
      authenticate();
    }
    if (!isOpenSubmission) {
      router.push('/');
    }
  }, [authenticate, id, isOpenSubmission, router]);

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
          <EditIdeaSolutionContainer user={user} />
        </div>
      </div>
    </Layout>
  );
};

EditIdea.propTypes = {
  user: shape({
    id: '',
    name: '',
    profile: {},
  }).isRequired,
};

export default withAuthSync(EditIdea);
