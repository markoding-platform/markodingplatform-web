import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

const UserCard = (props) => {
  const { imageUrl, name, description, link } = props;
  return (
    <Link href={link}>
      <a href={link} className={styles.link}>
        <div className={styles.card}>
          <Image
            src={imageUrl}
            alt={name}
            width={115}
            height={115}
            layout="fixed"
          />
          <h5 className={styles.title}>{name}</h5>
          <p className={styles.text}>{description}</p>
        </div>
      </a>
    </Link>
  );
};

UserCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default UserCard;
