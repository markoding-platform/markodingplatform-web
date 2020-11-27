import { memo } from 'react';
import Modal from 'react-bootstrap/Modal';
import { bool, node, func, string } from 'prop-types';

import { stySubtitle, styTitle, modalWrapper } from './style.module.scss';

const ModalComponent = ({
  show,
  onClose,
  title,
  subTitle,
  children,
  className,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      dialogClassName={`${className} ${modalWrapper}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5 className={styTitle}>{title}</h5>
          {subTitle && <p className={stySubtitle}>{subTitle}</p>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

ModalComponent.defaultProps = {
  className: '',
  children: '',
  subTitle: '',
  title: '',
};

ModalComponent.propTypes = {
  className: string,
  children: node,
  show: bool.isRequired,
  subTitle: string,
  title: string,
  onClose: func.isRequired,
};

export default memo(ModalComponent);
