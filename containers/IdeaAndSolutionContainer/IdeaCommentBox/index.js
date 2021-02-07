import dynamic from 'next/dynamic';
// import Loading from 'components/Loading';
// import React from 'react';

const DynamicIdeaCommentBox = dynamic(() =>
  import(/* webpackChunkName: "idea-comments" */ './View')
);

export default DynamicIdeaCommentBox;
