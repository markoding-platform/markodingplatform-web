import Link from 'next/link';
import { string } from 'prop-types';

import { circleImg, badgesWrapper } from './styles.module.scss';

const Badges = ({ name, imgUrl, link }) => {
  return (
    <Link href={link}>
      <a href={link} alt="name">
        <div className={badgesWrapper}>
          <img src={imgUrl} className={circleImg} alt={name} />
          <div className="mt-3 text-secondary text-center">{name}</div>
        </div>
      </a>
    </Link>
  );
};

Badges.defaultProps = {
  name: 'Javascript',
  imgUrl: '',
  link: '',
};

Badges.propTypes = {
  name: string,
  imgUrl: string,
  link: string,
};

export default Badges;
