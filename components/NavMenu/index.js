import React, { useState } from 'react';
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs';
import navItems from './navItems';
import { rotateDown, rotate, bgPrimary } from './styles.module.scss';

const NavMenu = () => {
  const [showNavTreeId, setShowNavTreeId] = useState(null);
  const handleShowNavTree = (val) => {
    setShowNavTreeId((prevState) =>
      prevState !== null && prevState === val ? null : val
    );
  };
  return (
    <ul className={`list-group list-group-flush ${bgPrimary}`}>
      {navItems.map((navItem) => (
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
              <a href={navItem.link}>
                <div className="d-flex align-items-start">
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
    </ul>
  );
};

export default NavMenu;
