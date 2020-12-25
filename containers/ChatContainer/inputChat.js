import { BiImageAlt, BiSmile } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import MarkodingFetch from 'libraries/MarkodingFetch';
import styles from './styles.module.scss';

const InputChat = () => {
  const [textChat, setTextChat] = useState('');

  const submitChat = async (event) => {
    if (event.key === 'Enter') {
      const result = await MarkodingFetch('/chats', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          content: textChat,
          type: 'text',
        }),
      });

      if (result.ok) {
        setTextChat('');
      }
    }
  };

  return (
    <div className={styles.inpGroup}>
      <button type="button" className={styles.addImage}>
        <BiImageAlt size={24} />
      </button>
      <Form.Control
        type="text"
        placeholder="Ketik Pesan"
        className={styles.inputChat}
        value={textChat}
        onChange={(event) => setTextChat(event.target.value)}
        onKeyPress={submitChat}
      />
      <BiSmile className={styles.searchIcon} />
    </div>
  );
};

export default InputChat;
