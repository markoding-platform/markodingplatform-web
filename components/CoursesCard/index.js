import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import styles from './styles.module.scss';

const CourseCard = (props) => {
  const { imageUrl, title, description, link } = props;
  return (
    <Card className={styles.card}>
      <div className={styles.image}>
        <Image src={imageUrl} alt={title} layout="fill" />
      </div>
      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.text}>{description}</Card.Text>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary btn-block"
        >
          Daftar kelas
        </a>
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
