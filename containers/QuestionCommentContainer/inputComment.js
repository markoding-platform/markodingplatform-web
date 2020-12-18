import { BiImageAlt, BiSmile } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import MarkodingFetch from 'libraries/MarkodingFetch';
import { string } from 'prop-types';
import { trigger } from 'swr';
import styles from './styles.module.scss';

const InputComment = ({ questionSlug }) => {
  const [comment, setComment] = useState('');

  const submitComment = async (event) => {
    if (event.key === 'Enter') {
      const result = await MarkodingFetch('/questions/comments', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          content: comment,
          question: questionSlug,
        }),
      });

      if (result.ok) {
        setComment('');
        await trigger(`/questions/comments/${questionSlug}?limit=10&offset=0`);
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
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        onKeyPress={submitComment}
      />
      <BiSmile className={styles.searchIcon} />
    </div>
  );
};

InputComment.propTypes = {
  questionSlug: string.isRequired,
};

export default InputComment;
