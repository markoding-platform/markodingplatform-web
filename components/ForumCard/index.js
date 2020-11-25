import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';
import styles from './styles.module.scss';

const ForumCard = (props) => {
  const { imageUrl, name, comment, likeCount, commentCount, time } = props;
  return (
    <div className={styles.root}>
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
          <h5>{name}</h5>
          <p className={styles.time}>{time}</p>
          <p className={styles.text}>{comment}</p>
        </Media.Body>
      </Media>
      <div className="d-flex justify-content-start border-top pt-2 pb-2 pl-3 pr-3">
        <div className="mr-5">
          <BsFillHeartFill className={styles.iconLike} />
          {`${likeCount} Likes`}
        </div>
        <div>
          <IoMdChatbubbles className={styles.iconComment} />
          {`${commentCount} Comments`}
        </div>
      </div>
    </div>
  );
};

ForumCard.defaultProps = {
  likeCount: 0,
  commentCount: 0,
};

ForumCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  time: PropTypes.string.isRequired,
};

export default ForumCard;
