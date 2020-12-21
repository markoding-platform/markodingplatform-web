import dynamic from 'next/dynamic';
import BlogLoader from './Loader';

const DynamicBlogContainer = dynamic(
  () => import(/* webpackChunkName: "blog-container-component" */ './View'),
  {
    loading: () => <BlogLoader />,
  }
);

export default DynamicBlogContainer;
