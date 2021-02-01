import dynamic from 'next/dynamic';

const DynamicIndividuaRank = dynamic(() =>
  import(/* webpackChunkName: "individual-rank-component" */ './IndividualRank')
);

export default DynamicIndividuaRank;
