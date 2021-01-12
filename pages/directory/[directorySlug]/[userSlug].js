import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine } from 'react-icons/ri';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import styles from 'styles/directory.module.scss';
import withAuthSync from 'hoc/withAuthSync';
import Router, { useRouter } from 'next/router';
import BlockAccessModal from 'components/BlockAccessModal';
import DirectoryDetailContainer from 'containers/DirectoryContainer/detail';
import userType from 'utils/userType';

const User = ({ user }) => {
  const router = useRouter();
  const { directorySlug, userSlug } = router.query;
  const title = userType(directorySlug);

  return (
    <Layout>
      <div className={styles.directoryContent}>
        <div className="pb-4">
          <PointBadgeWrapper desktopOnly />
        </div>
        <div className="inner-section">
          <Link href={`/directory/${directorySlug}`}>
            <div className="d-flex align-items-center mb-3">
              <RiArrowLeftSLine className={styles.backIcon} />
              <a
                href={`/directory/${directorySlug}`}
                className={styles.backTitle}
              >
                {title}
              </a>
            </div>
          </Link>
          {user && <DirectoryDetailContainer userSlug={userSlug} />}
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
    </Layout>
  );
};

User.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default withAuthSync(User);
