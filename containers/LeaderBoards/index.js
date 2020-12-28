import dynamic from 'next/dynamic';

const DynamicLeaderboardsContainer = dynamic(() =>
  import(/* webpackChunkName: "leaderboards-container" */ './View')
);

export default DynamicLeaderboardsContainer;
