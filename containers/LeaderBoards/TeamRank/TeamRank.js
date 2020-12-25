import { string } from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LeaderBoardList from '../LeadeboardList';
import { styDesc } from './styles.module.scss';

const TeamRank = ({ desc }) => {
  return (
    <div className="d-flex pb-4">
      <Row>
        <Col className="sm-12 lg-6">
          <p className={styDesc}>{desc}</p>
        </Col>
        <Col className="sm-12 lg-6">
          <LeaderBoardList />
        </Col>
      </Row>
    </div>
  );
};

TeamRank.propTypes = {
  desc: string.isRequired,
};

export default TeamRank;
