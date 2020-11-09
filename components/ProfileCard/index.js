import Card from 'react-bootstrap/Card';
import { BsPerson } from 'react-icons/bs';
import Image from 'next/image';
import Avatar from 'public/assets/avatar-min.png';
import { topTitle, content, contentTitle } from './styles.module.scss';

const ProfileCard = () => {
  return (
    <Card className="border-0 py-4">
      <div className={topTitle}>
        <span>
          <BsPerson size={20} color="white" />
        </span>
        <p className="text-white m-0">Team Leader</p>
      </div>
      <div className={content}>
        <Image
          width={200}
          height={200}
          className="rounded-circle"
          src={Avatar}
        />
        <p className={contentTitle}>Amanda Simandjuntak</p>
        <p className="m-0">Co-founder Markoding</p>
      </div>
    </Card>
  );
};

export default ProfileCard;
