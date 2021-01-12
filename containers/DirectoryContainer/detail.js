import styles from 'styles/directory.module.scss';
import Image from 'next/image';
import { RiInstagramFill, RiLinkedinBoxFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import React from 'react';
import useDirectory from 'hooks/useDirectory';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';
import userType from 'utils/userType';
import { Badge } from 'react-bootstrap';
import userDetailMap from '../../map/userDetailMap';

const DirectoryDetailContainer = ({ userSlug }) => {
  const { data, error } = useDirectory({ path: `/users/detail/${userSlug}` });
  const result = data && data.result ? userDetailMap(data.result) : null;
  const isLoading = !data && !error;

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && result && (
        <div className={styles.directoryCard}>
          <div className="position-relative mb-2">
            <div>
              <Image
                src={result.imageUrl}
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
          <Button variant="warning" block className={styles.chatButton}>
            Kirim Pesan
          </Button>
        </div>
      )}
    </>
  );
};

DirectoryDetailContainer.propTypes = {
  userSlug: PropTypes.string.isRequired,
};

export default DirectoryDetailContainer;
