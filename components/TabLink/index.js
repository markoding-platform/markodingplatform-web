import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const TabLink = ({ items }) => {
  return (
    <div className={styles.tabs}>
      {items.map((item) => (
        <Link key={item.id} href={item.link}>
          <button
            type="button"
            className={`${styles.tabItem} ${item.active && styles.active}`}
          >
            {item.label}
          </button>
        </Link>
      ))}
    </div>
  );
};

TabLink.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
};

export default TabLink;
