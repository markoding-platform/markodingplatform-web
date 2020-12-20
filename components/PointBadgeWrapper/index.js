import Form from 'react-bootstrap/Form';
import { DiHtml53DEffects } from 'react-icons/di';
import { BiSearchAlt2 } from 'react-icons/bi';
import { RiArrowRightSLine, RiMedalFill } from 'react-icons/ri';
import AuthButton from 'components/AuthButton';
import notifFill from 'svgs/notif-fill.svg';
import Icon from 'components/Icons';
import styles from './styles.module.scss';

const PointBadgeWrapper = () => {
  return (
    <div className={styles.pointBadge}>
      <div className="inner-section">
        <div className={styles.container}>
          <div className="d-flex d-lg-none align-items-center">
            <RiMedalFill size={22} />
            <span>4 MBadge</span>
            <RiArrowRightSLine size={22} />
          </div>
          <div className="d-flex d-lg-none align-items-center ml-4">
            <DiHtml53DEffects size={24} />
            <span>38.500 MPoin</span>
            <RiArrowRightSLine size={22} />
          </div>
          <div className="d-none d-lg-flex align-items-center ml-4">
            <div className={styles.searchGroup}>
              <Form.Control
                type="text"
                placeholder="Search"
                className={styles.search}
              />
              <BiSearchAlt2 className={styles.searchIcon} />
            </div>
          </div>
          <div className="d-none d-lg-flex align-items-center ml-4">
            <Icon src={notifFill} size={18} className={styles.notifFillIcon} />
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointBadgeWrapper;
