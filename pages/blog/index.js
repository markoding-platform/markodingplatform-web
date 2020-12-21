import React from 'react';

import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import styles from 'styles/blog.module.scss';
import DynamicBlogContainer from 'containers/Blog';

const Blog = () => {
  return (
    <Layout>
      <div className={styles.blogContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <DynamicBlogContainer />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
