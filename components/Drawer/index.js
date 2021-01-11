import React from 'react';
import { func, node } from 'prop-types';
import { BsX } from 'react-icons/bs';
import DicLogo from 'components/DICLogo';
import { drawerWrapper, card, closeBtn } from './styles.module.scss';

const Drawer = ({ onClose, children }) => {
  return (
    <div className={drawerWrapper}>
      <div className={card}>
        <div className="d-flex justify-content-between p-2">
          <DicLogo height="auto" />
          <button type="button" onClick={onClose} className={`btn ${closeBtn}`}>
            <BsX size="2rem" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

Drawer.defaultProps = {
  children: '',
};

Drawer.propTypes = {
  children: node,
  onClose: func.isRequired,
};

export default Drawer;
