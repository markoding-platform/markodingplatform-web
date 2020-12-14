import dynamic from 'next/dynamic';

const DynamicEventContainer = dynamic(() =>
  import(/* webpackChunkName: "event-container-component" */ './View')
);

export default DynamicEventContainer;
