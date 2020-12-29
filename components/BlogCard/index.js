import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

dayjs.locale('id');

const BlogCard = (props) => {
  const { imageUrl, title, description, date, link } = props;
  return (
    <Link href={link}>
      <a href={link} className={styles.link}>
        <Card className={styles.card}>
          <div className={styles.image}>
            <Image src={imageUrl} alt={title} layout="fill" />
          </div>
          <Card.Body>
            <Card.Title className={styles.title}>{title}</Card.Title>
            <Card.Text className={styles.text}>{description}</Card.Text>
            <Card.Text className={styles.date}>
              {dayjs(date).format('MMM DD, YYYY')}
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
};

BlogCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BlogCard;
