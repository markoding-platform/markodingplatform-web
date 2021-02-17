import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdChatbubbles } from 'react-icons/io';

import getCookie from 'utils/getCookie';
import canUseDOM from 'utils/canUseDOM';
import noImage from 'public/assets/default-idea-img.png';
import styles from './styles.module.scss';

const IdeaCard = (props) => {
  const router = useRouter();
  const {
    imageUrl,
    title,
    description,
    likeCount,
    commentCount,
    link,
    onBlockAuth,
  } = props;
  const userId = canUseDOM && getCookie('userID');
  const handleGoToIdea = (e) => {
    e.preventDefault();
    if (!userId) return onBlockAuth();
    router.push(link);
  };
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href={link} onClick={handleGoToIdea} className={styles.link}>
      <Card className={styles.card}>
        <div className={styles.image}>
          <Image src={imageUrl || noImage} alt={title} layout="fill" />
        </div>
        <Card.Body>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.text}>{description}</Card.Text>
          <div className="d-flex align-items-center justify-content-start">
            <div className="mr-4">
              <BsFillHeartFill className={styles.icon} />
              <span className="text-secondary">{likeCount}</span>
            </div>
            <div>
              <IoMdChatbubbles className={styles.icon} />
              <span className="text-secondary">{commentCount}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </a>
  );
};

IdeaCard.defaultProps = {
  likeCount: 0,
  commentCount: 0,
};

IdeaCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  link: PropTypes.string.isRequired,
  onBlockAuth: PropTypes.func.isRequired,
};

export default IdeaCard;
