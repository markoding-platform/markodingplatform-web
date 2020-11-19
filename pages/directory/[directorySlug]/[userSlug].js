import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import {
  RiArrowLeftSLine,
  RiLinkedinBoxFill,
  RiInstagramFill,
} from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import PointBadgeWrapper from 'components/PointBadgeWrapper';
import Layout from 'components/Layout';
import styles from 'styles/directory.module.scss';
import Image from 'next/image';

const User = ({ directorySlug, user }) => {
  return (
    <Layout>
      <div className={styles.directoryContent}>
        <div className="pb-4">
          <PointBadgeWrapper />
        </div>
        <div className="inner-section">
          <Link href={`/directory/${directorySlug}`}>
            <div className="d-flex align-items-center mb-3">
              <RiArrowLeftSLine className={styles.backIcon} />
              <a
                href={`/directory/${directorySlug}`}
                className={styles.backTitle}
              >
                {directorySlug}
              </a>
            </div>
          </Link>
          <div className={styles.directoryCard}>
            <Image
              src={user.imageUrl}
              alt={user.name}
              width={132}
              height={132}
              layout="fixed"
            />
            <h1 className="h4">{user.name}</h1>
            <p>{user.email}</p>
            <div className={styles.socialGroup}>
              <a href={user.linkedin} target="_blank" rel="noreferrer">
                <RiLinkedinBoxFill className={styles.socialIcon} />
              </a>
              <a href={user.instagram} target="_blank" rel="noreferrer">
                <RiInstagramFill className={styles.socialIcon} />
              </a>
            </div>
            <div className="mb-3 text-3rd">{user.bio}</div>
            <Button variant="warning" block className={styles.chatButton}>
              Kirim Pesan
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

User.propTypes = {
  directorySlug: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

User.getInitialProps = async (ctx) => {
  const { directorySlug, userSlug } = await ctx.query;
  const user = {
    slug: 'ariqah',
    name: `My name ${userSlug}`,
    title: 'Manager Product of Markoding Platform',
    email: 'ariqah@gmail.com',
    imageUrl:
      'https://image.freepik.com/free-photo/close-up-portrait-surprised-dark-eyed-girl-summer-hat-indoor-shot-funny-curly-female-model-white-t-shirt-posing-with-fingers-up-purple-wall_197531-5173.jpg',
    bio:
      'After sailing around the world with a UN Global Climate Expedition as a documentary filmmaker from age 17-20, Jacqui came to Singapore to become a "Systems Entrepreneur" starting one of the first B Corps and social enterprises in Singapore (at Impact Hub) which she led for 5 years before starting VSStory in 2016. Her vision is for businesses to become the solution for the world’s problems and not the cause. Forbes30U30 and a selected nominee for ey  entrepreneur of the year 2020',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  };
  return {
    directorySlug,
    user,
  };
};

export default User;
