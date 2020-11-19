import PropTypes from 'prop-types';
import React from 'react';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import Image from 'next/image';
import styles from 'styles/blog.module.scss';

const BlogDetail = ({ blog }) => {
  return (
    <Layout>
      <div className={styles.blogContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex align-items-center mb-4">
              <h1 className="h3">Cerita Markoding</h1>
            </div>
            <div>
              <Image
                src={blog.src}
                alt={blog.title}
                layout="responsive"
                width={957}
                height={457}
                className="rounded"
              />
              <h1 className="h3 mt-4">{blog.title}</h1>
              <p className="text-muted">{blog.date}</p>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

BlogDetail.propTypes = {
  blog: PropTypes.instanceOf(Object).isRequired,
};

BlogDetail.getInitialProps = async (ctx) => {
  const { slug } = await ctx.query;
  return {
    blog: {
      id: slug,
      title: 'MARKODING at Habibie Festival 2018',
      src:
        'https://image.freepik.com/free-photo/back-school-concept-books-colored-pencils-clock_155003-9212.jpg',
      link: '/todo',
      date: '25 April 2021',
      time: '2PM - 5PM',
      content: 'Terra, Social enterprise, manufatrues and sells...',
    },
  };
};

export default BlogDetail;
