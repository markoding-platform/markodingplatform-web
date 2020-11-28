import React from 'react';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import styles from 'styles/home.module.scss';
import HomeContainer from 'components/HomeContainer';

const Home = () => {
  return (
    <Layout activeMenu="/">
      <div className={styles.homeContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <HomeContainer />
      </div>
    </Layout>
  );
};

export default Home;
