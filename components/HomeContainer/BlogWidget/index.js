import dynamic from 'next/dynamic';
import WidgetLoader from '../WidgetLoader';

const DynamicBlogWidget = dynamic(
  () => import(/* webpackChunkName: "blog-widget-component" */ './BlogWidget'),
  {
    loading: () => <WidgetLoader />,
  }
);

export default DynamicBlogWidget;
