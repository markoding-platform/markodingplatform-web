import dynamic from 'next/dynamic';
import WidgetLoader from 'components/HomeContainer/WidgetLoader';

const DynamicGalleryIdeaWidget = dynamic(
  () =>
    import(
      /* webpackChunkName: "gallery-idea-component" */ './GalleryIdeaWidget'
    ),
  {
    loading: <WidgetLoader />,
  }
);

export default DynamicGalleryIdeaWidget;
