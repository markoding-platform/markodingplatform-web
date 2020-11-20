import { string } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsFillPersonFill } from 'react-icons/bs';
import Image from 'next/image';
import Avatar from 'public/assets/avatar-min.png';
import {
  topTitle,
  content,
  contentTitle,
  contentDesc,
} from './styles.module.scss';

const ProfileCard = ({ title, primaryText, secondaryText }) => {
  return (
    <Card className="border-0">
      <div className={topTitle}>
        <span>
          <BsFillPersonFill size={20} color="#0E0C0D" />
        </span>
        <p className="text-dark m-0">{title}</p>
      </div>
      <div className={content}>
        <Image
          width={114}
          height={114}
          layout="fixed"
          className="rounded-circle"
          src={Avatar}
        />
        <p className={contentTitle}>{primaryText}</p>
        <p className={contentDesc}>{secondaryText}</p>
      </div>
    </Card>
  );
};

ProfileCard.propTypes = {
  primaryText: string.isRequired,
  secondaryText: string.isRequired,
  title: string.isRequired,
};
export default ProfileCard;
