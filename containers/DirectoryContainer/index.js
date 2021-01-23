import styles from 'styles/directory.module.scss';
import React from 'react';
import PropTypes from 'prop-types';
import range from 'utils/range';
import BoxLoader from 'components/Shimmer/Box';
import useDirectory from 'hooks/useDirectory';
import Icon from 'components/Icons';
import Col from 'react-bootstrap/Col';
import UserCard from 'components/UserCard';
import Row from 'react-bootstrap/Row';
import warningBell from '../../svgs/warning-bell.svg';
import userMap from '../../map/userMap';

const DirectoryContainer = ({ directorySlug }) => {
  let userTypeSlug = 'students';
  if (directorySlug === 'teacher' || directorySlug === 'teachers') {
    userTypeSlug = 'teachers';
  } else if (directorySlug === 'mentor' || directorySlug === 'mentors') {
    userTypeSlug = 'mentors';
  }

  const { data, error } = useDirectory({ path: `/users/${userTypeSlug}` });
  const result = data?.result ? data.result.map(userMap) : [];
  const isLoading = !data && !error;

  const renderLoader = () => {
    const loaderArr = [];
    range(1, 4).forEach((item) => {
      loaderArr.push(
        <div key={item} className="mb-3">
          <BoxLoader height="60" />
        </div>
      );
    });
    return loaderArr;
  };

  return (
    <>
      {isLoading && renderLoader()}
      {!isLoading && result.length > 0 ? (
        <Row>
          {result.map((dir) => (
            <Col key={dir.id} xs={6} lg={4}>
              <div className={styles.directoryGrid}>
                <UserCard
                  imageUrl={dir.imageUrl}
                  name={dir.name}
                  description={dir.bio}
                  link={`/user/${dir.id}`}
                />
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div className={styles.emptyState}>
          <Icon src={warningBell} size={170} className="mb-3" />
          <h5 className="mb-1">Belum Ada User</h5>
          <p className={styles.textInfo}>Saat ini belum ada user. ya</p>
        </div>
      )}
    </>
  );
};

DirectoryContainer.propTypes = {
  directorySlug: PropTypes.string.isRequired,
};

export default DirectoryContainer;
