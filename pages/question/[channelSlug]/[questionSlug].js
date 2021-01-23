import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import useChannels from 'hooks/useChannel';
import Loading from 'components/Loading';
import QuestionCommentContainer from 'containers/QuestionCommentContainer';
import styles from 'styles/chat.module.scss';
import BlockAccessModal from 'components/BlockAccessModal';
import withAuthSync from '../../../hoc/withAuthSync';

const ChatThreadComment = ({ user, channelSlug, questionSlug }) => {
  const [blockAccessModal, setBlockAccessModal] = useState(false);
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
                <QuestionCommentContainer
                  questionSlug={questionSlug}
                  channelSlug={channelSlug}
                  user={user}
                  callBack={(condition) => {
                    if (condition === 'blocked') {
                      setBlockAccessModal(true);
                    }
                  }}
                />
              </>
            ) : (
              <p className="text-danger">Chanel tidak ditemukan</p>
            )}
          </div>
        </div>
      </div>
      {!user && (
        <BlockAccessModal
          show={blockAccessModal}
          onHide={() => {
            setBlockAccessModal(false);
          }}
        />
      )}
    </Layout>
  );
};

ChatThreadComment.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
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

export default withAuthSync(ChatThreadComment);
