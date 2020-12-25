import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import BlockAccessIcon from 'svgs/block-accsess.svg';
import { SSO } from 'utils/auth';
import styles from './styles.module.scss';

const BlockAccessModal = ({ show, onHide }) => {
  const authenticate = async () => {
    await SSO();
  };

  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className={styles.header}>
        <Modal.Title className="text-primary">Tidak Memiliki Akses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Image
            src={BlockAccessIcon}
            width={165}
            height={165}
            layout="fixed"
          />
        </div>
        <p className="text-center mt-3">
          Anda tidak memiliki akses untuk melihat percakapan ini, Sign up atau
          Log in untuk mendapat akses
        </p>
      </Modal.Body>
      <Modal.Footer className={styles.footer}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <Button
            type="button"
            block
            size="lg"
            variant="outline-dark"
            className="m-0 mr-2"
            onClick={authenticate}
          >
            Daftat
          </Button>
          <Button
            type="button"
            block
            size="lg"
            variant="warning"
            className="m-0 ml-2"
            onClick={authenticate}
          >
            Masuk
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

BlockAccessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default BlockAccessModal;
