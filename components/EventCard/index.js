import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import { BsCalendarFill, BsClockFill } from 'react-icons/bs';
import styles from './styles.module.scss';

const EventCard = (props) => {
  const { imageUrl, title, date, time, link } = props;
  return (
    <Link href={link}>
      <a href={link} className={styles.link}>
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
            <Card.Text className={styles.text}>
              <BsCalendarFill className={styles.icon} />
              {date}
            </Card.Text>
            <Card.Text className={styles.text}>
              <BsClockFill className={styles.icon} />
              {time}
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
};

EventCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default EventCard;
