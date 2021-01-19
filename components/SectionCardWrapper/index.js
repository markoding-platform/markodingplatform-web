import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import EmblaCarousel from 'components/EmblaCarousel';
import styles from './styles.module.scss';

const SectionCardWrapper = ({ title, link, children }) => {
  const childs = [];
  if (children && children.length > 0) {
    children.forEach((child, index) => {
      const key = `child-${index}`;
      childs.push(
        <div key={key} className={styles.bannerSlide}>
          {child}
        </div>
      );
    });
  }
  return (
    <>
      <div className="inner-section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>{title}</h2>
          <div className={styles.link}>
            <Link href={link}>Lihat semua</Link>
          </div>
        </div>
      </div>
      <div className="inner-full-section-card">
        <EmblaCarousel slideToScroll={2}>{childs}</EmblaCarousel>
      </div>
    </>
  );
};

SectionCardWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};

export default SectionCardWrapper;
