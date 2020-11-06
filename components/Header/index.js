import React, { useState } from 'react';

import { BsList } from 'react-icons/bs';
import MarkodingLogo from '../MarkodingLogo';
import Drawer from '../Drawer';
import skilvulLogo from '../assets/skilvulLogo.svg';
import NavMenu from '../NavMenu';
import notif from '../assets/notif.svg';
import Icon from '../Icons';
import { innerHeader, headerWrapper, burgerBtn } from './styles.module.scss';

const Header = () => {
	const [isOpeDrawer, setIsOpenDrawer] = useState(false);

	return (
  <header>
    <div className={headerWrapper}>
      <div className={innerHeader}>
        <button
          className={`btn bg-dark ${burgerBtn}`}
          type="button"
          onClick={() => setIsOpenDrawer(!isOpeDrawer)}
        >
          <BsList size="1.5rem" color="white" />
        </button>
        <MarkodingLogo />
        <div className="d-flex">
          <Icon src={skilvulLogo} size={30} />
          <Icon src={notif} size={30} />
        </div>
      </div>
    </div>
    {isOpeDrawer && (
    <Drawer
      isOpen={isOpeDrawer}
      onClose={() => setIsOpenDrawer(!isOpeDrawer)}
    >
      <NavMenu />
    </Drawer>
			)}
  </header>
	);
};

export default Header;
