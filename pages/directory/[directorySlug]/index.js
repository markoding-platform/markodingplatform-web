import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import UserCard from 'components/UserCard';
import styles from 'styles/directory.module.scss';

const Directory = ({ directorySlug, title, users }) => {
  return (
    <Layout>
      <div className={styles.directoryContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex align-items-center mb-4">
              <h2>{title}</h2>
            </div>
            <Row>
              {users.map((user) => (
                <Col key={user} xs={6} lg={4}>
                  <div className={styles.directoryGrid}>
                    <UserCard
                      imageUrl="https://image.freepik.com/free-photo/close-up-portrait-surprised-dark-eyed-girl-summer-hat-indoor-shot-funny-curly-female-model-white-t-shirt-posing-with-fingers-up-purple-wall_197531-5173.jpg"
                      name={`User ${user}`}
                      description={`VP ${user} of Markoding Platform`}
                      link={`/directory/${directorySlug}/user-${user}`}
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

Directory.defaultProps = {
  users: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

Directory.propTypes = {
  directorySlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  users: PropTypes.instanceOf(Array),
};

Directory.getInitialProps = async (ctx) => {
  const { directorySlug } = ctx.query;
  let title = 'Siswa';
  if (directorySlug === 'mentor') {
    title = 'Kakak Mentor';
  } else if (directorySlug === 'teacher') {
    title = 'Guru';
  }
  return {
    directorySlug,
    title,
  };
};

export default Directory;
