import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { RiArrowLeftSLine, RiLinkedinBoxFill, RiInstagramFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import UserCard from 'components/UserCard';
import styles from 'styles/directory.module.scss';

const User = ({ directorySlug, userSlug, user }) => {
  return (
    <Layout>
      <div className={styles.user}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="pb-4">
          <div className="inner-section">
            <div className="d-flex align-items-center mb-3">
              <RiArrowLeftSLine className={styles.backIcon} />
              <Link href={`/directory/${directorySlug}`}>
                <a href={`/directory/${directorySlug}`}>
                  {directorySlug}
                </a>
              </Link>
            </div>
            <div className="text-center">
              <UserCard
                imageUrl={user.imageUrl}
                name={user.name}
                description={user.title}
                link="/"
              />
              <div className={styles.socialGroup}>
                <a href={user.linkedin} target="_blank" rel="noreferrer">
                  <RiLinkedinBoxFill className={styles.socialIcon} />
                </a>
                <a href={user.instagram} target="_blank" rel="noreferrer">
                  <RiInstagramFill className={styles.socialIcon} />
                </a>
              </div>
              <div className="mb-3 text-3rd">
								{user.bio}
              </div>
              <Button variant="primary" block className={styles.chatButton}>
								Kirim Pesan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

User.propTypes = {
	directorySlug: PropTypes.string.isRequired,
	userSlug: PropTypes.string.isRequired,
	user: PropTypes.object.isRequired
};

User.getInitialProps = async ctx => {
	const { directorySlug, userSlug } = ctx.query;
	const user = {
		name: `My name ${userSlug}`,
		title: 'Manager Product of Markoding Platform',
		imageUrl: 'https://image.freepik.com/free-photo/close-up-portrait-surprised-dark-eyed-girl-summer-hat-indoor-shot-funny-curly-female-model-white-t-shirt-posing-with-fingers-up-purple-wall_197531-5173.jpg',
		bio: 'After sailing around the world with a UN Global Climate Expedition as a documentary filmmaker from age 17-20, Jacqui came to Singapore to become a "Systems Entrepreneur" starting one of the first B Corps and social enterprises in Singapore (at Impact Hub) which she led for 5 years before starting VSStory in 2016. Her vision is for businesses to become the solution for the world’s problems and not the cause. Forbes30U30 and a selected nominee for ey  entrepreneur of the year 2020',
		instagram: 'https://instagram.com',
		linkedin: 'https://linkedin.com',
	};
	return {
		directorySlug,
		userSlug,
		user
	}
};

export default User;
