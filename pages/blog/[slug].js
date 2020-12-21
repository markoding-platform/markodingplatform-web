import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';

import styles from 'styles/blog.module.scss';
import DynamicBlogDetailContainer from 'containers/BlogDetail';

const BlogDetail = () => {
  return (
    <Layout>
      <div className={styles.blogContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <DynamicBlogDetailContainer />
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetail;
