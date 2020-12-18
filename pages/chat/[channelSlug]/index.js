import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import styles from 'styles/chat.module.scss';
import QuestionContainer from 'containers/QuestionContainer';
import useChannels from 'hooks/useChannel';
import Loading from 'components/Loading';

const ChatThread = ({ channelSlug }) => {
  const tabLinks = [
    {
      id: 1,
      label: 'Tanya Jawab',
      link: `/chat/${channelSlug}`,
      active: true,
    },
    {
      id: 2,
      label: 'Chat',
      link: `/chat/${channelSlug}/random`,
      active: false,
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
                  <Button type="button" variant="warning">
                    Tanya Pertanyaan Baru
                  </Button>
                </div>
                <TabLink items={tabLinks} />
                <QuestionContainer channelSlug={channelSlug} />
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

ChatThread.propTypes = {
  channelSlug: PropTypes.string.isRequired,
};

ChatThread.getInitialProps = async (ctx) => {
  const { channelSlug } = await ctx.query;
  return {
    channelSlug,
  };
};

export default ChatThread;
