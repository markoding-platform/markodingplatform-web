import React from 'react';
import { BsX } from 'react-icons/bs';
import MarkodingLogo from '../MarkodingLogo';
import { drawerWrapper, card } from './styles.module.scss';

const Drawer = ({ onClose, children }) => {
	return (
  <div className={drawerWrapper}>
    <div className={card}>
      <div className="d-flex justify-content-between">
        <MarkodingLogo />
        <button type="button" onClick={onClose} className="btn">
          <BsX size="2rem" />
        </button>
      </div>
      {children}
    </div>
  </div>
	);
};

export default Drawer;
