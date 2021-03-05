import styles from 'styles/directory.module.scss';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import range from 'utils/range';
import BoxLoader from 'components/Shimmer/Box';
import useDirectory from 'hooks/useDirectory';
import Icon from 'components/Icons';
import Col from 'react-bootstrap/Col';
import UserCard from 'components/UserCard';
import Row from 'react-bootstrap/Row';
import { useRouter } from 'next/router';
import Pagination from 'components/Pagination';
import userMap from '../../map/userMap';
import warningBell from '../../svgs/warning-bell.svg';

const DirectoryContainer = ({ directorySlug }) => {
  const limit = 9;
  const router = useRouter();
  const { query } = router;
  const currentOffset = Number(query?.start) || 0;
  const currentPage = Number(query?.page) || 1;

  let userTypeSlug = 'students';
  if (directorySlug === 'teacher' || directorySlug === 'teachers') {
    userTypeSlug = 'teachers';
  } else if (directorySlug === 'mentor' || directorySlug === 'mentors') {
    userTypeSlug = 'mentors';
  }

  const { data: response, error } = useDirectory({
    url: `/users/${userTypeSlug}?limit=${limit}&offset=${currentOffset}`,
  });
  const result = response?.result || {};
  const { data, pages = {} } = result;
  const directories = data.map(userMap) || [];

  const isLoading = !response && !error;

  const handlePageChanged = useCallback(
    (page) => {
      const offset = limit * page - limit;
      router.replace(
        `/directory/${userTypeSlug}/?page=${page}&start=${offset}`
      );
    },
    [router]
  );

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
      {!isLoading && directories > 0 ? (
        <>
          <Row>
            {directories.map((dir) => (
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
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              totalRecords={pages.count}
              totalPages={pages.totalPages}
              pageLimit={limit}
              onPageChanged={handlePageChanged}
              defaultPage={currentPage}
            />
          </div>
        </>
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
