import { string } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsPerson } from 'react-icons/bs';
import Image from 'next/image';
import Avatar from 'public/assets/avatar-min.png';
import { topTitle, content, contentTitle } from './styles.module.scss';

const ProfileCard = ({ title, primaryText, secondaryText }) => {
  return (
    <Card className="border-0 py-4">
      <div className={topTitle}>
        <span>
          <BsPerson size={20} color="#0E0C0D" />
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
        <p className="m-0">{secondaryText}</p>
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
