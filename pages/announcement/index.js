import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import AnnouncementContainer from 'containers/announcementContainer';

export default function Announcement() {
  return (
    <Layout activeMenu="/information">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <AnnouncementContainer />
        </div>
      </div>
    </Layout>
  );
}
