import dynamic from 'next/dynamic';

const DynamicEventDetailContainer = dynamic(() =>
  import(/* webpackChunkName: "event-detail-container-component" */ './View')
);

export default DynamicEventDetailContainer;
