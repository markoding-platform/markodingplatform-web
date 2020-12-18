import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import ChatContainer from 'containers/ChatContainer';
import useChannels from 'hooks/useChannel';
import Loading from 'components/Loading';
import styles from 'styles/chat.module.scss';

const ChatRandom = ({ channelSlug }) => {
  const tabLinks = [
    {
      id: 1,
      label: 'Tanya Jawab',
      link: `/chat/${channelSlug}`,
      active: false,
    },
    {
      id: 2,
      label: 'Chat',
      link: `/chat/${channelSlug}/random`,
      active: true,
    },
  ];

  const { data, error } = useChannels({ url: `/channels/${channelSlug}` });
  const result = data?.result || {};
  const isLoading = !data && !error;

  return (
    <Layout activeMenu="/chat">
      <div className={styles.chatContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            {isLoading && <Loading />}

            {!isLoading && result && result.id ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h1 className="h3">{`#${result.name}`}</h1>
                </div>
                <TabLink items={tabLinks} />
                <ChatContainer />
              </>
            ) : (
              <p className="text-danger">Chanel tidak ditemukan</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

ChatRandom.propTypes = {
  channelSlug: PropTypes.string.isRequired,
};

ChatRandom.getInitialProps = async (ctx) => {
  const { channelSlug } = await ctx.query;
  return {
    channelSlug,
  };
};

export default ChatRandom;
