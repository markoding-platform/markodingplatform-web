import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { BsClockFill } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

dayjs.locale('id');

const AnnouncementCard = ({ title, subtitle, date, link }) => {
  return (
    <Link href={link}>
      <a href={link}>
        <div className="d-flex justify-content-between align-items-start">
          <div className={styles.logo}>
            <Badge variant="danger" className={styles.badge}>
              &nbsp;
            </Badge>
            <Image
              src="/assets/markoding-logo-small.jpg"
              width={60}
              height={60}
              layout="fixed"
              className="rounded-circle"
            />
          </div>
          <div className={styles.wording}>
            <h6 className="mb-0">{title}</h6>
            <p className="mb-0">{subtitle}</p>
            <div className="d-flex align-items-center">
              <BsClockFill size={14} className="text-muted" />
              <small className="text-muted ml-2">
                {dayjs(date).format('MMM DD, YYYY')}
              </small>
            </div>
          </div>
          <div className={styles.button}>
            <Button type="button" variant="outline-primary">
              Tampilkan Pengumuman
            </Button>
          </div>
        </div>
      </a>
    </Link>
  );
};

AnnouncementCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AnnouncementCard;
