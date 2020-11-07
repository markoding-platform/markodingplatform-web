import React from 'react';
import { func, node } from 'prop-types';
import { BsX } from 'react-icons/bs';
import MarkodingLogo from 'components/MarkodingLogo';
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

Drawer.defaultProps = {
  children: '',
};

Drawer.propTypes = {
  children: node,
  onClose: func.isRequired,
};

export default Drawer;
