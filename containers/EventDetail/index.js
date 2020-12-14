import dynamic from 'next/dynamic';
import EventLoader from './Loader';

const DynamicEventDetailContainer = dynamic(
  () =>
    import(/* webpackChunkName: "event-detail-container-component" */ './View'),
  {
    loading: () => <EventLoader />,
  }
);

export default DynamicEventDetailContainer;
