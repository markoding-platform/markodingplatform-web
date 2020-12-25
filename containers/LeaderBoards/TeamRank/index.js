import dynamic from 'next/dynamic';

const DynamicTeamRank = dynamic(() =>
  import(/* webpackChunkName: "team-rank-component" */ './TeamRank')
);

export default DynamicTeamRank;
