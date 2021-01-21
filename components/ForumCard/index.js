import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';
import number from 'utils/number';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import styles from './styles.module.scss';

const ForumCard = (props) => {
  const {
    imageUrl,
    name,
    comment,
    likeCount,
    commentCount,
    time,
    link,
    onLike,
  } = props;

  return (
    <div className={styles.root}>
      <Link href={link}>
        <Media className="p-3">
          <div className={styles.avatar}>
            <Image
              src={imageUrl}
              alt={name}
              width={52}
              height={52}
              layout="responsive"
              className="rounded"
            />
          </div>
          <Media.Body>
            <Card.Link href={link}>
              <h5>{name}</h5>
            </Card.Link>
            <p className={styles.time}>{time}</p>
            <p className={styles.text}>{comment}</p>
          </Media.Body>
        </Media>
      </Link>
      <div className="d-flex justify-content-start border-top pt-2 pb-2 pl-3 pr-3">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="mr-5 pointer" onClick={onLike}>
          <BsFillHeartFill className={styles.iconLike} />
          <span>{`${number(likeCount)} Likes`}</span>
        </div>
        <div>
          <Card.Link href={link}>
            <IoMdChatbubbles className={styles.iconComment} />
            {`${number(commentCount)} Comments`}
          </Card.Link>
        </div>
      </div>
    </div>
  );
};

ForumCard.defaultProps = {
  likeCount: 0,
  commentCount: 0,
  link: '/',
  onLike: () => {},
};

ForumCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  time: PropTypes.string.isRequired,
  link: PropTypes.string,
  onLike: PropTypes.func,
};

export default ForumCard;
