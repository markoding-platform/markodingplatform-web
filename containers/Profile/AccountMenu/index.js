import Image from 'next/image';

import { RiPencilFill } from 'react-icons/ri';
import Avatar from 'svgs/avatar.svg';

import {
  profileCard,
  profileSection,
  contentTitle,
} from './styles.module.scss';

const AccountMenu = ({ fName, email, profilePictureUrl, schoolName }) => {
  return (
    <div className={profileCard}>
      <div className="text-center">
        <Image
          width={132}
          height={132}
          layout="fixed"
          className="rounded-circle"
          src={profilePictureUrl || Avatar}
        />
        <div className="text-center text-3rd">
          <RiPencilFill size="20" />
          <span className="ml-2">Edit</span>
        </div>
      </div>
      <div className={`pt-3 ${profileSection}`}>
        <p className={contentTitle}>{fName}</p>
        <p className="m-0 text-wrap">{email}</p>
        <p className="m-0 text-wrap">{schoolName}</p>
      </div>
    </div>
  );
};

export default AccountMenu;
