import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { bool, func, string } from 'prop-types';
import MarkodingFetch from 'libraries/MarkodingFetch';
import Loading from 'components/Loading';
import styles from './styles.module.scss';

const InputQuestion = ({ show, onClose, channelSlug }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [textQuestion, setTextQuestion] = useState('');

  const submitQuestion = async () => {
    setIsLoading(true);
    const result = await MarkodingFetch('/questions', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        content: textQuestion,
        channel: channelSlug,
      }),
    });

    if (result.ok) {
      setTextQuestion('');
      onClose('reload');
    }

    setIsLoading(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Tulis Pertanyaan</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          value={textQuestion}
          rows={3}
          className={styles.textInput}
          onChange={(event) => setTextQuestion(event.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Batal
        </Button>
        <Button variant="primary" onClick={submitQuestion} disabled={isLoading}>
          <div className="d-flex align-items-center">
            {isLoading && <Loading withText={false} />}
            <span className="ml-2">Kirim</span>
          </div>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

InputQuestion.propTypes = {
  show: bool.isRequired,
  onClose: func.isRequired,
  channelSlug: string.isRequired,
};

export default InputQuestion;
