import dynamic from 'next/dynamic';
import WidgetLoader from '../WidgetLoader';

const DynamicCourseWidget = dynamic(
  () =>
    import(/* webpackChunkName: "course-widget-component" */ './CourseWidget'),
  {
    loading: () => <WidgetLoader />,
  }
);

export default DynamicCourseWidget;
