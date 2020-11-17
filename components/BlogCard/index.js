import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';

const BlogCard = (props) => {
  const { imageUrl, title, description, date, link } = props;
  return (
    <Link href={link}>
      <a href={link} className={styles.link}>
        <Card className={styles.card}>
          <Image src={imageUrl} alt={title} width="auto" height={200} />
          <Card.Body>
            <Card.Title className={styles.title}>{title}</Card.Title>
            <Card.Text className={styles.text}>{description}</Card.Text>
            <Card.Text className={styles.date}>{date}</Card.Text>
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
