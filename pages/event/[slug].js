import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import DynamicEventDetailContainer from 'containers/EventDetail';
import styles from 'styles/event.module.scss';

const EventDetail = () => {
  return (
    <Layout>
      <div className={styles.eventContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <DynamicEventDetailContainer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
