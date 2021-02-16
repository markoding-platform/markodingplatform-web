import dynamic from 'next/dynamic';
// import Loading from 'components/Loading';
// import React from 'react';

const DynamicIdeaCommentContainer = dynamic(() =>
  import(/* webpackChunkName: "idea-comments" */ './View')
);

export default DynamicIdeaCommentContainer;
