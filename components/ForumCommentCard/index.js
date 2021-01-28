import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import styles from './styles.module.scss';

const ForumCommentCard = (props) => {
  const { avatarUrl, userId, name, time, payload } = props;
  return (
    <Media>
      <div className={styles.avatar}>
        <Link href={`/user/${userId}`}>
          <a href={`/user/${userId}`}>
            <Image
              src={avatarUrl}
              alt={name}
              width={52}
              height={52}
              layout="responsive"
              className="rounded-circle"
            />
          </a>
        </Link>
      </div>
      <Media.Body>
        <Link href={`/user/${userId}`}>
          <a href={`/user/${userId}`} className={styles.noHover}>
            <div className="d-flex align-items-center mb-2">
              <span className="h5 mb-0">{name}</span>
              <span className={styles.time}>{time}</span>
            </div>
          </a>
        </Link>
        <div className="d-block position-relative">
          {payload.text && <p className={styles.text}>{payload.text}</p>}
          {payload.image && (
            <Image
              src={payload.image}
              alt={name}
              width={650}
              height={450}
              layout="intrinsic"
              className="rounded"
            />
          )}
        </div>
      </Media.Body>
    </Media>
  );
};

ForumCommentCard.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  payload: PropTypes.instanceOf(Object).isRequired,
};

export default ForumCommentCard;
