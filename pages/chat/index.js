import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import TabLink from 'components/TabLink';
import styles from '../../styles/chat.module.scss';

const Chat = () => {
  const tabLinks = [
    {
      id: 1,
      label: 'Tanya Jawab',
      link: `/chat/`,
      active: false,
    },
    {
      id: 2,
      label: 'Chat',
      link: '/chat',
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
              <h1 className="h3">Chat</h1>
            </div>
            <TabLink items={tabLinks} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
