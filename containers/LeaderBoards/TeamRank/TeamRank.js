import LeaderBoardList from '../LeadeboardList';
import { styDesc } from './styles.module.scss';

const TeamRank = () => {
  return (
    <div className="d-flex">
      <div className="w-50">
        <p className={styDesc}>
          Papan peringkat team ini menunjukan Mpoin Sobat Markoding yang sudah
          menyelesaikan berbagai macam kelas, kuis, dan tantangan secara real
          time.
        </p>
      </div>
      <div className="w-50">
        <LeaderBoardList />
      </div>
    </div>
  );
};

export default TeamRank;
