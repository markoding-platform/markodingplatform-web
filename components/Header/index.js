import React from 'react';
import { BsList } from 'react-icons/bs';
import skilvulLogo from '../assets/skilvulLogo.svg';
import markodingLogo from '../assets/markoding-logo-min.png';
import notif from '../assets/notif.svg';
import Icon from '../Icons';
import {
	innerHeader,
	rightControls,
	headerWrapper,
	logo,
} from './styles.module.scss';

const Header = () => {
	return (
  <div className={headerWrapper}>
    <div className={innerHeader}>
      <BsList />
      <img src={markodingLogo} className={logo} alt="markoding logo" />
      <div className={rightControls}>
        <Icon src={skilvulLogo} size={30} />
        <Icon src={notif} size={30} />
      </div>
    </div>
  </div>
	);
};

export default Header;
