import dynamic from 'next/dynamic';

const DynamicForumWidget = dynamic(() =>
  import(/* webpackChunkName: "partners-container-component" */ './View')
);

export default DynamicForumWidget;
