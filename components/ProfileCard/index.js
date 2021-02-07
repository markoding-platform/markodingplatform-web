import { func, string, bool } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import Image from 'next/image';
import Avatar from 'svgs/avatar.svg';
import {
  topTitle,
  content,
  contentTitle,
  contentDesc,
  removeBtn,
} from './styles.module.scss';

const ProfileCard = ({
  title,
  primaryText,
  secondaryText,
  withRemoveBtn,
  onClickRemove,
  imageUrl,
}) => {
  return (
    <Card className="border-0">
      {withRemoveBtn && (
        <AiFillCloseCircle
          aria-label="remove-btn"
          size={20}
          color="#D72E3D"
          className={removeBtn}
          onClick={onClickRemove}
        />
      )}
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
          src={imageUrl || Avatar}
        />
        <p className={contentTitle}>{primaryText}</p>
        <p className={contentDesc}>{secondaryText}</p>
      </div>
    </Card>
  );
};

ProfileCard.defaultProps = {
  withRemoveBtn: false,
  onClickRemove: () => {},
};

ProfileCard.propTypes = {
  primaryText: string.isRequired,
  secondaryText: string.isRequired,
  title: string.isRequired,
  imageUrl: string.isRequired,
  withRemoveBtn: bool,
  onClickRemove: func,
};
export default ProfileCard;
