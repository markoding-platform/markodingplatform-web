import React from 'react';
import PropTypes from 'prop-types';
import { BiImageAlt, BiSmile } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import BubbleChat from 'components/BubbleChat';
import styles from 'styles/chat.module.scss';

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

const ChatRandom = ({ slug }) => {
  const tabLinks = [
    {
      id: 1,
      label: 'Tanya Jawab',
      link: `/chat/${slug}`,
      active: false,
    },
    {
      id: 2,
      label: 'Chat',
      link: `/chat/${slug}/random`,
      active: true,
    },
  ];

  return (
    <Layout activeMenu="/chat">
      <div className={styles.chatContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3">{`#${slug}`}</h1>
            </div>
            <TabLink items={tabLinks} />
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

ChatRandom.propTypes = {
  slug: PropTypes.string.isRequired,
};

ChatRandom.getInitialProps = async (ctx) => {
  const { slug } = await ctx.query;
  return {
    slug,
  };
};

export default ChatRandom;
