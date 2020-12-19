import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import styles from 'styles/chat.module.scss';
import QuestionContainer from 'containers/QuestionContainer';
import useChannels from 'hooks/useChannel';
import Loading from 'components/Loading';
import InputQuestion from 'containers/QuestionContainer/inputQuestion';

const ChatThread = ({ channelSlug }) => {
  const [showFormQuestion, setShowFormQuestion] = useState(false);
  const { data, error } = useChannels({ url: `/channels/${channelSlug}` });
  const result = data?.result || {};
  const isLoading = !data && !error;

  return (
    <Layout activeMenu="/question">
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
                  <Button
                    type="button"
                    variant="warning"
                    onClick={() => setShowFormQuestion(true)}
                  >
                    Tanya Pertanyaan Baru
                  </Button>
                </div>
                <QuestionContainer channelSlug={channelSlug} />
              </>
            ) : (
              <p className="text-danger">Chanel tidak ditemukan</p>
            )}
          </div>
        </div>
      </div>
      <InputQuestion
        show={showFormQuestion}
        onClose={() => setShowFormQuestion(false)}
        channelSlug={channelSlug}
      />
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
