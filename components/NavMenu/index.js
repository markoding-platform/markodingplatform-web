import React from 'react';
import Link from 'next/link';
import navItems from './navItems';

const NavMenu = () => {
	return (
  <ul className="list-group list-group-flush bg-primary">
    {navItems.map((navItem) => (
      <Link key={navItem.id} href={navItem.link}>
        <li className="list-group-item bg-primary justify-content-between align-items-center">
          <a href={navItem.link}>
            {navItem.text}
            {navItem.withBadge && (
            <span className="badge badge-danger text-right badge-pill">14</span>
							)}
          </a>
        </li>
      </Link>
			))}
  </ul>
	);
};

export default NavMenu;
