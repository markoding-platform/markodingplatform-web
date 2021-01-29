import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import ChatContainer from 'containers/ChatContainer';
import styles from 'styles/chat.module.scss';
import BlockAccessModal from 'components/BlockAccessModal';
import Router from 'next/router';
import canUseDOM from 'utils/canUseDOM';
import withAuthSync from '../../hoc/withAuthSync';

const Chat = ({ user }) => {
  useEffect(() => {
    if (canUseDOM) {
      document.body.classList.add('no-scroll');
    }
    return () => {
      if (canUseDOM) {
        document.body.classList.remove('no-scroll');
      }
    };
  });

  return (
    <Layout activeMenu="/chat" withFooter={false} className="layoutBg">
      <div className={styles.chatContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-2">
          <div className="inner-section">
            <div className="ml-lg-5">
              <div className="mb-4 border-bottom">
                <h1 className="h3">Chat</h1>
              </div>
              {user && <ChatContainer user={user} />}
              {!user && (
                <BlockAccessModal
                  show
                  onHide={() => {
                    Router.push('/');
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Chat.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default withAuthSync(Chat);
