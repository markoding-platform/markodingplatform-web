import dynamic from 'next/dynamic';

const DynamicLeaderboardsContainer = dynamic(() =>
  import(/* webpackChunkName: "leaderboards-container" */ './Leaderboards')
);

export default DynamicLeaderboardsContainer;
