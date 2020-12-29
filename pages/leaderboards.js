import Layout from 'components/Layout';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import DynamicLeaderboardsContainer from 'containers/LeaderBoards';

const Leaderboards = () => {
  return (
    <Layout activeMenu="/idea">
      <div className="main-content">
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section pb-5">
          <DynamicLeaderboardsContainer />
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboards;
