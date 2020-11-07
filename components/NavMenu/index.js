import React, { useState } from 'react';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';
import navItems from './navItems';
import { rotateDown, rotate, bgPrimary } from './styles.module.scss';

const NavMenu = () => {
  const [isShowNavTree, setShowNavTree] = useState(false);
  const handleShowNavTree = () => {
    setShowNavTree((prevState) => !prevState);
  };
  return (
    <ul className={`list-group list-group-flush ${bgPrimary}`}>
      {navItems.map((navItem) => (
        <li key={navItem.id} className={`list-group-item ${bgPrimary}`}>
          {navItem?.children ? (
            <div
              role="presentation"
              className="d-flex justify-content-between"
              onClick={handleShowNavTree}
            >
              {navItem.text}
              <BsChevronDown
                className={`${rotate} ${isShowNavTree && rotateDown}`}
                size={20}
              />
            </div>
          ) : (
            <Link href={navItem.link}>
              <a href={navItem.link}>
                <div className="d-flex">
                  {navItem.text}
                  {navItem.withBadge && (
                    <span className="ml-2 badge badge-danger text-right badge-pill">
                      14
                    </span>
                  )}
                </div>
              </a>
            </Link>
          )}

          {navItem?.children && isShowNavTree && (
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
    </ul>
  );
};

export default NavMenu;