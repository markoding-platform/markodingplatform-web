import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { FaLightbulb, FaBook, FaUserCircle } from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { SSO } from 'utils/auth';
import getCookie from 'utils/getCookie';
import { styNavItem, styIcon, styTextIcon } from './styles.module.scss';

const BottomNavigation = ({ activeKey }) => {
  const [isLogged, setIsLogged] = useState(false);
  const checkAccount = () => {
    const logged = getCookie('markodingToken');
    setIsLogged(logged || false);
  };

  const authenticate = async () => {
    await SSO();
  };

  useEffect(() => {
    checkAccount();
  }, []);

  return (
    <Nav className="justify-content-between nav-bottom" activeKey={activeKey}>
      <Nav.Item className={styNavItem}>
        <Link href="/">
          <Nav.Link href="/" className="p-0">
            <AiFillHome className={styIcon} />
            <div className={styTextIcon}>Beranda</div>
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item className={styNavItem}>
        <Link href="/idea">
          <Nav.Link href="/idea" className="p-0">
            <FaLightbulb className={styIcon} />
            <div className={styTextIcon}>Idea</div>
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item className={styNavItem}>
        <Link href="/chat">
          <Nav.Link href="/chat" className="p-0">
            <IoMdChatbubbles className={styIcon} />
            <div className={styTextIcon}>Chat</div>
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item className={styNavItem}>
        <Link href="/course">
          <Nav.Link href="/course" className="p-0">
            <FaBook className={styIcon} />
            <div className={styTextIcon}>Kelas</div>
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item className={styNavItem}>
        {isLogged ? (
          <Link href="/account">
            <Nav.Link href="/account" className="p-0">
              <FaUserCircle className={styIcon} />
              <div className={styTextIcon}>Akun</div>
            </Nav.Link>
          </Link>
        ) : (
          <Nav.Link onClick={authenticate} className="p-0">
            <FaUserCircle className={styIcon} />
            <div className={styTextIcon}>Akun</div>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

BottomNavigation.defaultProps = {
  activeKey: '',
};

BottomNavigation.propTypes = {
  activeKey: PropTypes.string,
};

export default BottomNavigation;
