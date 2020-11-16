import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import { BsFillHeartFill } from "react-icons/bs";
import { IoMdChatbubbles } from "react-icons/io";
import styles from './styles.module.scss';

const IdeaCard = props => {
	const {imageUrl, title, description, likeCount, commentCount, link} = props;
	return (
  <Link href={link}>
    <a href={link} className={styles.link}>
      <Card className={styles.card}>
        <Image
          src={imageUrl}
          alt={title}
          width="auto"
          height={200}
        />
        <Card.Body>
          <Card.Title className={styles.title}>{title}</Card.Title>
          <Card.Text className={styles.text}>
            {description}
          </Card.Text>
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
  </Link>
	);
};

IdeaCard.defaultProps = {
	likeCount: 0,
	commentCount: 0
};

IdeaCard.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	likeCount: PropTypes.number,
	commentCount: PropTypes.number,
	link: PropTypes.string.isRequired,
};

export default IdeaCard;
