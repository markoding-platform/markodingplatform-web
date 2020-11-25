import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import styles from '../../../styles/chat.module.scss';

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
