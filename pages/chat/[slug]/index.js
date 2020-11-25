import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BiSearchAlt2 } from 'react-icons/bi';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import ForumCard from 'components/ForumCard';
import styles from 'styles/chat.module.scss';

const dummyData = [
  {
    id: 1,
    imageUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    comment:
      'Saya mau menampilkan hasil form yang dimasukkan tapi selalu Undifined variable di codeigniter gimana ya?',
    name: 'Yusuf Makmur',
    time: '5 min ago',
    commentCount: 20,
    likeCount: 81,
  },
  {
    id: 2,
    imageUrl:
      'https://image.freepik.com/free-vector/man-face-close-up_98292-4059.jpg',
    comment:
      'hallo gan, disini saya punya data customer sebanyak 50rb, setiap dibuka web nya/di refresh butuh waktu 1 menit buat bisa liat tampilannya, cara nya biar diload nya cepet gmn ya? ada solusi?',
    name: 'Nurul Zannah',
    time: '1 year ago',
    commentCount: 19,
    likeCount: 30,
  },
];

const ChatThread = ({ slug }) => {
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
              <Button type="button" variant="warning">
                Tanya Pertanyaan Baru
              </Button>
            </div>
            <TabLink items={tabLinks} />
            <div className={styles.searchGroup}>
              <Form.Control
                type="text"
                placeholder="Cari Pertanyaan"
                className={styles.search}
              />
              <BiSearchAlt2 className={styles.searchIcon} />
            </div>
            <div className="mt-2">
              {dummyData.map((t) => (
                <div key={t.id} className="mb-3">
                  <Link href={`/chat/${slug}/${t.id}`}>
                    <a href={`/chat/${slug}/${t.id}`} className={styles.link}>
                      <ForumCard
                        imageUrl={t.imageUrl}
                        comment={t.comment}
                        name={t.name}
                        time={t.time}
                        commentCount={t.commentCount}
                        likeCount={t.likeCount}
                      />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

ChatThread.propTypes = {
  slug: PropTypes.string.isRequired,
};

ChatThread.getInitialProps = async (ctx) => {
  const { slug } = await ctx.query;
  return {
    slug,
  };
};

export default ChatThread;
