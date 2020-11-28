import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from './styles.module.scss';

const BubbleChat = ({ avatar, name, payload, time, position }) => {
  return (
    <div className={`${styles.root} ${styles[position]}`}>
      {position === 'left' && (
        <Image
          src={avatar}
          alt={name}
          width={45}
          height={45}
          layout="fixed"
          className="rounded-circle"
        />
      )}
      <div className={styles.bubbleGroup}>
        <div className={`${styles.bubble} ${styles[position]}`}>
          {position === 'left' && <h6>{name}</h6>}
          <p className="mb-0">{payload.text}</p>
        </div>
        <small className={styles.dateTime}>{time}</small>
      </div>
    </div>
  );
};

BubbleChat.defaultProps = {
  position: 'left',
};

BubbleChat.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  payload: PropTypes.instanceOf(Object).isRequired,
  time: PropTypes.string.isRequired,
  position: PropTypes.string,
};

export default BubbleChat;
