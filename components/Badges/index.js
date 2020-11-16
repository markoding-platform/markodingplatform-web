import { string } from 'prop-types';

import { circleImg, badgesWrapper } from './styles.module.scss';

const Badges = ({ name }) => {
  return (
    <div className={badgesWrapper}>
      <div className={circleImg} />
      <div className="mt-3 text-secondary">{name}</div>
    </div>
  );
};

Badges.defaultProps = {
  name: 'Javascript',
};

Badges.propTypes = {
  name: string,
};

export default Badges;
