import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import { BsCalendarFill, BsClockFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

dayjs.locale('id');

const EventCard = (props) => {
  const { imageUrl, title, startDate, startAt, finishAt, link } = props;

  const handleFormatTime = useCallback((time) => {
    if (!time) return '';
    const splitTime = time.split(':');
    return `${splitTime[0]}:${splitTime[1]}`;
  }, []);

  const timeString =
    (startAt &&
      finishAt &&
      `${handleFormatTime(startAt)} - ${handleFormatTime(finishAt)}`) ||
    '';
  return (
    <Link href={link}>
      <a href={link} className={styles.link}>
        <Card className={styles.card}>
          <div className={styles.image}>
            <Image src={imageUrl} alt={title} layout="fill" />
          </div>
          <Card.Body>
            <Card.Title className={styles.title}>{title}</Card.Title>
            <Card.Text className={styles.text}>
              <BsCalendarFill className={styles.icon} />
              {`${dayjs(startDate).format('dddd, MMM DD YYYY')}`}
            </Card.Text>
            <Card.Text className={styles.text}>
              <BsClockFill className={styles.icon} />
              {timeString}
            </Card.Text>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
};

EventCard.defaultProps = {
  finishAt: '',
  startAt: '',
};

EventCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  finishDate: PropTypes.string.isRequired,
  startAt: PropTypes.string,
  finishAt: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default EventCard;
