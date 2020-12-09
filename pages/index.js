import React from 'react';
import useSWR from 'swr';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import HomeContainer from 'components/HomeContainer';
import SkilvulFetch from 'libraries/SkilvulFetch';
import styles from 'styles/home.module.scss';
import courseMap from '../map/courseMap';

const Home = () => {
  let courses;
  const { data: courseRes } = useSWR(
    '/api/course?limit=3&offset=1',
    SkilvulFetch
  );
  if (courseRes && courseRes.products) {
    courses = courseRes.products.map(courseMap);
  }

  return (
    <Layout activeMenu="/">
      <div className={styles.homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <HomeContainer courses={courses} />
      </div>
    </Layout>
  );
};

export default Home;
