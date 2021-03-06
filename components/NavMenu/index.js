import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';

import Footer from 'components/Footer';
import useNavItem from 'hooks/useNavItem';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Logout } from 'utils/auth';
import getCookie from 'utils/getCookie';
import useAnnouncementCount from 'hooks/useAnnouncementCount';
import { rotateDown, rotate, bgPrimary } from './styles.module.scss';

const NavMenu = ({ onClickMenu }) => {
  const navItems = useNavItem();
  const [showNavTreeId, setShowNavTreeId] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const handleShowNavTree = (val) => {
    setShowNavTreeId((prevState) =>
      prevState !== null && prevState === val ? null : val
    );
  };
  const notifCount = useAnnouncementCount();

  const checkAccount = () => {
    const logged = getCookie('markodingToken');
    setIsLogged(logged || false);
  };

  const doLogout = async () => {
    onClickMenu();
    checkAccount();
    await Logout({});
  };

  useEffect(() => {
    checkAccount();
  }, []);

  return (
    <>
      <ul className={`list-group list-group-flush ${bgPrimary}`}>
        {navItems &&
          navItems.map((navItem) => (
            <li key={navItem.id} className={`list-group-item ${bgPrimary}`}>
              {navItem?.children ? (
                <div
                  role="presentation"
                  className="d-flex justify-content-between"
                  onClick={() => handleShowNavTree(navItem.id)}
                >
                  {navItem.text}
                  <BsChevronDown
                    className={`${rotate} ${
                      showNavTreeId === navItem.id && rotateDown
                    }`}
                    size={20}
                  />
                </div>
              ) : (
                <Link href={navItem.link}>
                  <a href={navItem.link} onClick={onClickMenu}>
                    <div className="d-flex align-items-start">
                      {navItem.text}
                      {navItem.withBadge && (
                        <span className="ml-2 badge badge-danger text-right badge-pill">
                          {navItem.id === 0 ? notifCount : 0}
                        </span>
                      )}
                    </div>
                  </a>
                </Link>
              )}

              {navItem?.children && showNavTreeId === navItem.id && (
                <ul className="list-group list-group-flush">
                  {navItem.children.map((item) => (
                    <li
                      key={item.id}
                      className={`${bgPrimary} list-group-item border-0 justify-content-between align-items-center`}
                    >
                      <Link href={item.link}>
                        <a href={item.link}>{item.text}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        {isLogged && (
          <li className={`list-group-item ${bgPrimary} d-lg-none`}>
            <Button
              type="button"
              size="sm"
              block
              variant="danger"
              onClick={doLogout}
            >
              Keluar
            </Button>
          </li>
        )}
      </ul>
      <div className="d-lg-none">
        <Footer />
      </div>
    </>
  );
};

NavMenu.defaultProps = {
  onClickMenu: () => {},
};

NavMenu.propTypes = {
  onClickMenu: PropTypes.func,
};

export default NavMenu;
