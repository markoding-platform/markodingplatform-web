import LeaderBoardList from '../LeadeboardList';
import { styDesc } from './styles.module.scss';

const TeamRank = ({ desc }) => {
  return (
    <div className="d-flex pb-4">
      <div className="w-50">
        <p className={styDesc}>{desc}</p>
      </div>
      <div className="w-50">
        <LeaderBoardList />
      </div>
    </div>
  );
};

export default TeamRank;
