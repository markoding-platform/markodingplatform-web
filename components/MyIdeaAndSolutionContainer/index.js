import Image from 'next/image';

import Button from 'react-bootstrap/Button';
import Avatar from 'public/assets/avatar-min.png';
import MyStats from './MyStats';

import {
  profileWrapper,
  profileCard,
  contentTitle,
  btnEditProfile,
  wrapperStats,
} from './styles.module.scss';

const MyIdeaAndSolutionContainer = () => {
  return (
    <div className="shadow">
      <div className={profileWrapper}>
        <div>
          <div className={profileCard}>
            <Image
              width={132}
              height={132}
              layout="fixed"
              className="rounded-circle"
              src={Avatar}
            />
            <div className="px-3">
              <p className={contentTitle}>Amanda Simandjuntak</p>
              <p className="m-0">Co-founder Markoding</p>
              <Button className={`bg-info ${btnEditProfile}`}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        <div className={wrapperStats}>
          <MyStats />
          <MyStats />
        </div>
      </div>
    </div>
  );
};

export default MyIdeaAndSolutionContainer;
