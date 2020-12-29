import dynamic from 'next/dynamic';

const DynamicLeaderboardsContainer = dynamic(() =>
  import(
    /* webpackChunkName: "leaderboards-container" */ './LeaderboardsContainer'
  )
);

export default DynamicLeaderboardsContainer;
