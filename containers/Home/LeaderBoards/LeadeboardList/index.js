import { arrayOf, shape } from 'prop-types';
import PodiumContainer from './Podium';

const LeaderBoardList = ({ podium, restPodium }) => {
  return (
    <div>
      <PodiumContainer podiums={podium || []} rest={restPodium || []} />
    </div>
  );
};

LeaderBoardList.propTypes = {
  podium: arrayOf(shape({})).isRequired,
  restPodium: arrayOf(shape({})).isRequired,
};

export default LeaderBoardList;
