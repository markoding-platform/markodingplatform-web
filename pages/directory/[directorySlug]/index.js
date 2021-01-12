import PropTypes from 'prop-types';
import React from 'react';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import styles from 'styles/directory.module.scss';
import withAuthSync from 'hoc/withAuthSync';
import Router, { useRouter } from 'next/router';
import BlockAccessModal from 'components/BlockAccessModal';
import DirectoryContainer from 'containers/DirectoryContainer';
import userType from 'utils/userType';

const Directory = ({ user }) => {
  const router = useRouter();
  const { directorySlug } = router.query;
  const title = userType(directorySlug);

  return (
    <Layout>
      <div className={styles.directoryContent}>
        <div className="pb-4">
          <PointBadgeWrapper desktopOnly />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex align-items-center mb-4">
              <h1 className="h3">{title}</h1>
            </div>
            {user && <DirectoryContainer directorySlug={directorySlug} />}
            {!user && (
              <BlockAccessModal
                show
                onHide={() => {
                  Router.push('/');
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Directory.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default withAuthSync(Directory);
