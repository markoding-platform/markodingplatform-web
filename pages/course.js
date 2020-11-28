import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import CourseCard from 'components/CoursesCard';
import Layout from 'components/Layout';
import styles from 'styles/blog.module.scss';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const getCourses = () => {
    const dataDummy = [
      {
        id: 'javascript-dasar',
        title: 'Javascript Dasar',
        src:
          'https://skilvul-prod-01.s3.ap-southeast-1.amazonaws.com/course/jpFTJLRtjyRGYMpLwUPKR.jpg',
        link: 'https://www.skilvul.com/courses/javascript-dasar',
        description:
          'Di kelas ini kita akan belajar bagaimana membuat sebuah website menjadi lebih interaktif dengan menambahkan beberapa program yang ditulis menggunakan JavaScript',
      },
      {
        id: 'html-dasar',
        title: 'HTML Dasar',
        src:
          'https://skilvul-prod-01.s3.ap-southeast-1.amazonaws.com/course/FwqK3W86sKns3jn-3qmN3.jpg',
        link: 'https://www.skilvul.com/courses/html-dasar',
        description:
          'Di kelas ini, kita akan belajar bagaimana membuat sebuah website dari awal dengan menggunakan HTML.',
      },
      {
        id: 'css-dasar',
        title: 'CSS Dasar',
        src:
          'https://skilvul-prod-01.s3.ap-southeast-1.amazonaws.com/course/fnf0dPehzaPgyRjr1hZb1.jpg',
        link: 'https://www.skilvul.com/courses/css-dasar',
        description:
          'Di kelas ini kita akan belajar bagaimana cara memberikan style pada setiap element di website dengan menggunakan CSS',
      },
    ];
    setCourses(dataDummy);
  };

  useEffect(() => {
    getCourses();
  }, []);

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
              {courses.map((course) => (
                <Col key={course.id} xs={6} lg={4}>
                  <div className={styles.blogGrid}>
                    <CourseCard
                      imageUrl={course.src}
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
