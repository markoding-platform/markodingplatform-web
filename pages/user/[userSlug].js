import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
  const { userSlug } = router.query;
  const [directory, setDirectory] = useState('');

  return (
    <Layout>
      <div className={styles.directoryContent}>
        <div className="pb-4">
          <PointBadgeWrapper desktopOnly />
        </div>
        <div className="inner-section">
          <Link href={`/directory/${directory}`}>
            <div className="d-flex align-items-center mb-3">
              <RiArrowLeftSLine className={styles.backIcon} />
              <a href={`/directory/${directory}`} className={styles.backTitle}>
                {userType(directory)}
              </a>
            </div>
          </Link>
          {user && (
            <DirectoryDetailContainer
              userSlug={userSlug}
              callBack={(profileType) => {
                setDirectory(profileType);
              }}
            />
          )}
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
