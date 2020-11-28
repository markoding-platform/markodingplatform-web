import dynamic from 'next/dynamic';
import WidgetLoader from '../WidgetLoader';

const DynamicEventWidget = dynamic(
  () =>
    import(/* webpackChunkName: "Event-widget-component" */ './EventWidget'),
  {
    loading: <WidgetLoader />,
  }
);

export default DynamicEventWidget;
