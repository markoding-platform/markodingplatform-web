import dynamic from 'next/dynamic';

const DynamicIdeaCommentBox = dynamic(() =>
  import(/* webpackChunkName: "idea-comments" */ './View')
);

export default DynamicIdeaCommentBox;
