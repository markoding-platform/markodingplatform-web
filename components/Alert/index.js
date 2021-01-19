import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { node, string, func, bool } from 'prop-types';
import Alert from 'react-bootstrap/Alert';

import { styBtnGhost } from './styles.module.scss';

const AlertComponent = ({ variant, children, open, onClose }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleCloseAlert = () => {
    setIsOpen(!isOpen);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <Alert
          variant={variant}
          className="d-flex justify-content-between btn-ghost"
        >
          {children}
          <Button className={styBtnGhost} onClick={handleCloseAlert}>
            X
          </Button>
        </Alert>
      )}
    </>
  );
};

AlertComponent.propTypes = {
  open: bool.isRequired,
  variant: string,
  children: node.isRequired,
  onClose: func,
};

AlertComponent.defaultProps = {
  variant: 'success', // primary | secondary | warning | info
  onClose: () => {},
};

export default AlertComponent;
