import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

const CoursesCard = (props) => {
  const { imageUrl, title, description, link } = props;
  return (
    <Card className={styles.card}>
      <Image
        src={imageUrl}
        alt={title}
        width={308}
        height={177}
        layout="responsive"
      />
      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.text}>{description}</Card.Text>
        <Link href={link}>
          <a href={link} className="btn btn-primary btn-block">
            Daftar kelas
          </a>
        </Link>
      </Card.Body>
    </Card>
  );
};

CoursesCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default CoursesCard;
