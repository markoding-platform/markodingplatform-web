import { string } from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import useLeaderboards from 'hooks/useLeaderboardsTeam';
import LeaderBoardList from '../LeadeboardList';
import { styDesc } from './styles.module.scss';

const TeamRank = ({ desc }) => {
  const { data, isLoading } = useLeaderboards({
    url: '/leaderboards/team?sort=-liked',
  });
  return (
    <div className="d-flex pb-4">
      <Row>
        <Col className="sm-12 lg-6">
          <p className={styDesc}>{desc}</p>
        </Col>
        <Col className="sm-12 lg-6">
          {!isLoading && Object.keys(data).length > 0 && (
            <LeaderBoardList
              podium={data.podium}
              restPodium={data.restPodium}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

TeamRank.propTypes = {
  desc: string.isRequired,
};

export default TeamRank;
