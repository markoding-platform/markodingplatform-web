import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import BlogCard from 'components/BlogCard';
import styles from 'styles/blog.module.scss';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = () => {
    const dataDummy = [
      {
        id: 'one',
        title: 'MARKODING at Habibie Festival 2018',
        src:
          'https://image.freepik.com/free-vector/back-school-sales_23-2148621951.jpg',
        link: '/todo',
        date: '25 April 2021',
        time: '2PM - 5PM',
        description: 'Terra, Social enterprise, manufatrues and sells...',
      },
      {
        id: 'two',
        title: 'MARKODING at Habibie Festival 2019',
        src:
          'https://image.freepik.com/free-psd/girl-doing-stretching-exercises_23-2148253770.jpg',
        link: '/todo',
        date: '3 Mei 2021',
        time: '1PM - 5PM',
        description: 'Terra, Social enterprise, manufatrues and sells...',
      },
      {
        id: 'three',
        title: 'MARKODING at Habibie Festival 2020',
        src:
          'https://image.freepik.com/free-photo/smiling-teacher-with-drink-classroom_23-2148201042.jpg',
        link: '/todo',
        date: '25 Jun 2021',
        time: '1PM - 4PM',
        description: 'Terra, Social enterprise, manufatrues and sells...',
      },
    ];
    setBlogs(dataDummy);
  };

  useEffect(() => {
    getBlogs();
  }, []);

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
            <Row>
              {blogs.map((blog) => (
                <Col key={blog.id} xs={6} lg={4}>
                  <div className={styles.blogGrid}>
                    <BlogCard
                      key={blog.id}
                      imageUrl={blog.src}
                      title={blog.title}
                      description={blog.description}
                      date={blog.date}
                      link={`/blog/${blog.id}`}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
