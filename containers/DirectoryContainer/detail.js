import styles from 'styles/directory.module.scss';
import Image from 'next/image';
import { RiInstagramFill, RiLinkedinBoxFill } from 'react-icons/ri';
import React from 'react';
import useDirectory from 'hooks/useDirectory';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';
import userType from 'utils/userType';
import { Badge } from 'react-bootstrap';
import Avatar from 'svgs/avatar.svg';
import userDetailMap from '../../map/userDetailMap';

const DirectoryDetailContainer = ({ userSlug, callBack }) => {
  const { data, error } = useDirectory({ url: `/users/detail/${userSlug}` });
  const result = data && data.result ? userDetailMap(data.result) : null;
  const isLoading = !data && !error;

  if (result) {
    callBack(result.type);
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && result && (
        <div className={styles.directoryCard}>
          <div className="position-relative mb-2">
            <div>
              <Image
                src={result.imageUrl || Avatar}
                alt={result.name}
                width={132}
                height={132}
                layout="fixed"
              />
            </div>
            <Badge pill variant="warning" className={styles.badgeLabel}>
              {userType(result.type)}
            </Badge>
          </div>
          <h1 className="h4">{result.name}</h1>
          <p>{result.email}</p>
          <div className={styles.socialGroup}>
            <a href={result.linkedin} target="_blank" rel="noreferrer">
              <RiLinkedinBoxFill className={styles.socialIcon} />
            </a>
            <a href={result.instagram} target="_blank" rel="noreferrer">
              <RiInstagramFill className={styles.socialIcon} />
            </a>
          </div>
          <div className="mb-3 text-3rd">{result.title}</div>
        </div>
      )}
    </>
  );
};

DirectoryDetailContainer.propTypes = {
  userSlug: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default DirectoryDetailContainer;
