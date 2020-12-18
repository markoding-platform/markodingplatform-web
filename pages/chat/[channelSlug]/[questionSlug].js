import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import useChannels from 'hooks/useChannel';
import Loading from 'components/Loading';
import QuestionCommentContainer from 'containers/QuestionCommentContainer';
import styles from 'styles/chat.module.scss';

const ChatThreadComment = ({ channelSlug, questionSlug }) => {
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
                </div>
                <TabLink items={tabLinks} />
                <QuestionCommentContainer questionSlug={questionSlug} />
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

ChatThreadComment.propTypes = {
  channelSlug: PropTypes.string.isRequired,
  questionSlug: PropTypes.string.isRequired,
};

ChatThreadComment.getInitialProps = async (ctx) => {
  const { channelSlug, questionSlug } = await ctx.query;
  return {
    channelSlug,
    questionSlug,
  };
};

export default ChatThreadComment;
