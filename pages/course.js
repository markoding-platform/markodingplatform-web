import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import CourseCard from 'components/CourseCard';
import Layout from 'components/Layout';
import styles from 'styles/blog.module.scss';
import useSWR from 'swr';
import SkilvulFetch from 'libraries/SkilvulFetch';
import courseMap from '../map/courseMap';

const Course = () => {
  let courses;
  const { data: courseRes } = useSWR(
    '/api/course?limit=6&offset=1',
    SkilvulFetch
  );
  if (courseRes && courseRes.products) {
    courses = courseRes.products.map(courseMap);
  }

  return (
    <Layout activeMenu="/course">
      <div className={styles.blogContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex align-items-center mb-4">
              <h1 className="h3">Kelas Online</h1>
            </div>
            <Row>
              {courses &&
                courses.map((course) => (
                  <Col key={course.id} xs={6} lg={4}>
                    <div className={styles.blogGrid}>
                      <CourseCard
                        imageUrl={course.imageUrl}
                        title={course.title}
                        description={course.description}
                        link={course.link}
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

export default Course;
