import dynamic from 'next/dynamic';

const DynamicLeaderBoardContainer = dynamic(() =>
  import(/* webpackChunkName: "leaderboard-container-component" */ './View')
);

export default DynamicLeaderBoardContainer;
