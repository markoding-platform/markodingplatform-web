import React, { useState } from 'react';

import { BsList } from 'react-icons/bs';
import Icon from 'components/Icons';
import MarkodingLogo from 'components/MarkodingLogo';
import Drawer from 'components/Drawer';
import skilvulLogo from 'assets/skilvulLogo.svg';
import NavMenu from 'components/NavMenu';
import notif from 'assets/notif.svg';
import notifFill from 'assets/notif-fill.svg';

import { innerHeader, headerWrapper, burgerBtn, desktopLogo, desktopSkilvulIcon, desktopNotifIcon } from './styles.module.scss';

const Header = () => {
  const [isOpeDrawer, setIsOpenDrawer] = useState(false);

  return (
    <header>
      <div className="d-none d-lg-block">
        <div className={desktopLogo}>
          <MarkodingLogo isSmall />
          <div className="d-flex align-items-center">
            <Icon src={skilvulLogo} size={25} className={desktopSkilvulIcon} />
            <Icon src={notifFill} size={24} className={desktopNotifIcon} />
          </div>
        </div>
        <NavMenu />
      </div>
      <div className="d-block d-lg-none">
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
      </div>
    </header>
  );
};

export default Header;
