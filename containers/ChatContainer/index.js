import React from 'react';
import BubbleChat from 'components/BubbleChat';
import { BiImageAlt, BiSmile } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss';

const dummyData = [
  {
    id: 1,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Yusuf',
    time: '10/03/2020, 11:01',
    payload: {
      text: 'Hi, Samantha!',
      image: '',
    },
  },
  {
    id: 1,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Ariqah',
    time: '10/03/2020, 11:01',
    payload: {
      text: 'Oh hi, Ariqah',
      image: '',
    },
  },
  {
    id: 3,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Yusuf',
    time: '10/03/2020, 11:01',
    payload: {
      text: 'Nanti sore kita meet ya mbahas design kemaren',
      image: '',
    },
  },
  {
    id: 4,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Norman',
    time: '10/03/2020, 11:01',
    payload: {
      text: 'Ikutan dong ya',
      image: '',
    },
  },
];

const ChatContainer = () => {
  return (
    <>
      <div className={styles.chatWrap}>
        {dummyData.map((c) => (
          <div key={c.id} className="mb-4">
            <BubbleChat
              payload={c.payload}
              avatar={c.avatarUrl}
              name={c.name}
              time={c.time}
              position={c.id === 3 ? 'right' : 'left'}
            />
          </div>
        ))}
      </div>
      <div className={styles.inpGroup}>
        <button type="button" className={styles.addImage}>
          <BiImageAlt size={24} />
        </button>
        <Form.Control
          type="text"
          placeholder="Ketik Pesan"
          className={styles.inputChat}
        />
        <BiSmile className={styles.searchIcon} />
      </div>
    </>
  );
};

export default ChatContainer;
