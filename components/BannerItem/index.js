import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

const BannerItem = (props) => {
  const { title, imageUrl, link } = props;
  return (
    <div className={styles.bannerSlide}>
      <div className={styles.bannerSlideInner}>
        <Link href={link}>
          <div className={styles.image}>
            <Image
              src={imageUrl}
              alt={title}
              layout="intrinsic"
              width={979}
              height={283}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

BannerItem.defaultProps = {
  link: '/',
};

BannerItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default BannerItem;
