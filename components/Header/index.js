import React, { useState } from 'react';
import Link from 'next/link';
import { BsList } from 'react-icons/bs';
import Icon from 'components/Icons';
import DicLogo from 'components/DICLogo';
import Drawer from 'components/Drawer';
import NavMenu from 'components/NavMenu';
import notif from 'svgs/notif.svg';
import useAnnouncementCount from 'hooks/useAnnouncementCount';
import Badge from 'react-bootstrap/Badge';
import {
  innerHeader,
  headerWrapper,
  burgerBtn,
  desktopLogo,
  rootHeader,
  dicLogo,
} from './styles.module.scss';

const Header = () => {
  const [isOpeDrawer, setIsOpenDrawer] = useState(false);
  const notifCount = useAnnouncementCount();

  return (
    <header className={rootHeader}>
      <div className="d-none d-lg-block">
        <div className={desktopLogo}>
          <DicLogo width="200px" height="auto" />
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
            <h1 className={dicLogo}>DIGITAL INNOVATION CHALLENGE</h1>
            <div className="d-flex">
              <Link href="/announcement">
                <a href="/announcement">
                  <Icon src={notif} size={30} cl>
                    {notifCount && +notifCount > 0 && (
                      <Badge variant="danger" className="badgeNotif">
                        &nbsp;
                      </Badge>
                    )}
                  </Icon>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {isOpeDrawer && (
          <Drawer
            isOpen={isOpeDrawer}
            onClose={() => setIsOpenDrawer(!isOpeDrawer)}
          >
            <NavMenu onClickMenu={() => setIsOpenDrawer(false)} />
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Header;
