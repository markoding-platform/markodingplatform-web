import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Media from 'react-bootstrap/Media';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

import number from 'utils/number';
import Avatar from 'svgs/avatar.svg';
import { Card } from 'react-bootstrap';
import styles from './styles.module.scss';

const ForumCard = (props) => {
  const {
    imageUrl,
    userId,
    name,
    comment,
    likeCount,
    commentCount,
    time,
    link,
    onLike,
    withLikes,
  } = props;

  return (
    <div className={styles.root}>
      <Media className="p-3">
        <div className={styles.avatar}>
          <Link href={`/user/${userId}`}>
            <a href={`/user/${userId}`}>
              <Image
                src={imageUrl !== 'null' && imageUrl !== '' ? imageUrl : Avatar}
                alt={name}
                width={52}
                height={52}
                layout="responsive"
                className="rounded"
              />
            </a>
          </Link>
        </div>
        <Media.Body>
          <Link href={`/user/${userId}`}>
            <Card.Link href={`/user/${userId}`}>
              <h5>{name}</h5>
            </Card.Link>
          </Link>
          <p className={styles.time}>{time}</p>
          <p className={styles.text}>{comment}</p>
        </Media.Body>
      </Media>
      {withLikes && (
        <div className="d-flex justify-content-start border-top pt-2 pb-2 pl-3 pr-3">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={styles.textLike} onClick={onLike}>
            <BsFillHeartFill className={styles.iconLike} />
            <span>{`${number(likeCount)} Likes`}</span>
          </div>
          <div>
            <Link href={link}>
              <Card.Link href={link}>
                <IoMdChatbubbles className={styles.iconComment} />
                {`${number(commentCount)} Comments`}
              </Card.Link>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

ForumCard.defaultProps = {
  likeCount: 0,
  commentCount: 0,
  link: '/',
  withLikes: true,
  onLike: () => {},
  imageUrl: Avatar,
};

ForumCard.propTypes = {
  imageUrl: PropTypes.string,
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  time: PropTypes.string.isRequired,
  link: PropTypes.string,
  withLikes: PropTypes.bool,
  onLike: PropTypes.func,
};

export default ForumCard;
