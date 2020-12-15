import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import styles from 'styles/event.module.scss';
import DynamicEventContainer from 'containers/Events';

const Event = () => {
  return (
    <Layout>
      <div className={styles.eventContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <DynamicEventContainer />
        </div>
      </div>
    </Layout>
  );
};

export default Event;
