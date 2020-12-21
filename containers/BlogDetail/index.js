import dynamic from 'next/dynamic';
import BlogLoader from '../EventDetail/Loader';

const DynamicBlogDetailContainer = dynamic(
  () =>
    import(/* webpackChunkName: "blog-detail-container-component" */ './View'),
  {
    loading: () => <BlogLoader />,
  }
);

export default DynamicBlogDetailContainer;
