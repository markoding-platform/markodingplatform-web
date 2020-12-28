import dynamic from 'next/dynamic';

const DynamicPartnersWidget = dynamic(() =>
  import(/* webpackChunkName: "partners-container-component" */ './View')
);

export default DynamicPartnersWidget;
