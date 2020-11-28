import React from 'react';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import styles from '../../styles/chat.module.scss';

const Chat = () => {
  return (
    <Layout activeMenu="/chat">
      <div className={styles.chatContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3">Chat</h1>
            </div>
            <ListGroup>
              <Link href="/chat/HTML">
                <ListGroup.Item action href="/chat/HTML">
                  #HTML
                </ListGroup.Item>
              </Link>
              <Link href="/chat/CSS">
                <ListGroup.Item action href="/chat/CSS">
                  #CSS
                </ListGroup.Item>
              </Link>
              <Link href="/chat/Javascript">
                <ListGroup.Item action href="/chat/Javascript">
                  #Javascript
                </ListGroup.Item>
              </Link>
              <Link href="/chat/Other">
                <ListGroup.Item action href="/chat/Other">
                  #Other
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
