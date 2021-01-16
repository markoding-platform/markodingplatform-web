import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import DashboardContainer from 'containers/Dashboard';
import { homeContent } from 'styles/home.module.scss';

export default function Dashboard() {
  return (
    <Layout activeMenu="/idea">
      <div className={homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <DashboardContainer />
        </div>
      </div>
    </Layout>
  );
}
