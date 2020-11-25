import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import ForumCommentCard from 'components/ForumCommentCard';
import Form from 'react-bootstrap/Form';
import { BiImageAlt, BiSmile } from 'react-icons/bi';
import styles from '../../../styles/chat.module.scss';

const dummyData = [
  {
    id: 1,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Muamar Alfatah',
    time: '5 min ago',
    payload: {
      text: 'Begini bagus gak?',
      image:
        'https://image.freepik.com/free-vector/illustration-computer-hacking-code_53876-26940.jpg',
    },
  },
  {
    id: 1,
    avatarUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    name: 'Yusuf Makmur',
    time: '55 min ago',
    payload: {
      text: 'php artisan make:controller \nAuthorController --resource',
      image: '',
    },
  },
];

const ChatThreadComment = ({ slug }) => {
  const tabLinks = [
    {
      id: 1,
      label: 'Tanya Jawab',
      link: `/chat/${slug}`,
      active: true,
    },
    {
      id: 2,
      label: 'Chat',
      link: `/chat/${slug}/random`,
      active: false,
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
                  <ForumCommentCard
                    avatarUrl={c.avatarUrl}
                    name={c.name}
                    time={c.time}
                    payload={c.payload}
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

ChatThreadComment.propTypes = {
  slug: PropTypes.string.isRequired,
  threadSlug: PropTypes.string.isRequired,
};

ChatThreadComment.getInitialProps = async (ctx) => {
  const { slug, threadSlug } = await ctx.query;
  return {
    slug,
    threadSlug,
  };
};

export default ChatThreadComment;
