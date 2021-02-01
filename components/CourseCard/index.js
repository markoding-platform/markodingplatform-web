import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import Card from 'react-bootstrap/Card';

import getCookie from 'utils/getCookie';
import canUseDOM from 'utils/canUseDOM';
import { SSO } from 'utils/auth';
import styles from './styles.module.scss';

const CourseCard = (props) => {
  const { imageUrl, title, description, link } = props;
  const userId = canUseDOM && getCookie('userID');

  const authenticate = async () => {
    await SSO();
  };

  const handleClickClass = () => {
    if (userId) {
      window.open(link, '_blank');
    }
    return authenticate();
  };
  return (
    <Card className={styles.card}>
      <div className={styles.image}>
        {imageUrl && <Image src={imageUrl} alt={title} layout="fill" />}
      </div>

      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.text}>{description}</Card.Text>
        <btn onClick={handleClickClass} className="btn btn-primary btn-block">
          Daftar kelas
        </btn>
      </Card.Body>
    </Card>
  );
};

CourseCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CourseCard;
