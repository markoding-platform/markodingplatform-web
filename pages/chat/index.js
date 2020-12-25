import PropTypes from 'prop-types';
import React from 'react';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import ChatContainer from 'containers/ChatContainer';
import styles from 'styles/chat.module.scss';
import BlockAccessModal from 'components/BlockAccessModal';
import Router from 'next/router';
import withAuthSync from '../../hoc/withAuthSync';

const Chat = ({ user }) => {
  return (
    <Layout activeMenu="/chat">
      <div className={styles.chatContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
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
