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
          <Image
            src={imageUrl}
            alt={title}
            width={955}
            height={276}
            layout="responsive"
          />
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
