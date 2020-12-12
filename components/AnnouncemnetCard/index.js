import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { BsClockFill } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const AnnouncementCard = ({ title, subtitle, date, link }) => {
  return (
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
          <small className="text-muted ml-2">{date}</small>
        </div>
      </div>
      <div className={styles.button}>
        <Link href={link}>
          <a href={link} className="btn btn-outline-info">
            Tampilkan Pengumuman
          </a>
        </Link>
      </div>
    </div>
  );
};

AnnouncementCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AnnouncementCard;
