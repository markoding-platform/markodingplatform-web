import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { FaLightbulb, FaBook, FaUserCircle } from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import { SSO } from 'utils/auth';
import getCookie from 'utils/getCookie';
import styles from './styles.module.scss';

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
      <Nav.Item>
        <Link href="/">
          <Nav.Link href="/">
            <AiFillHome className={styles.icon} />
            Beranda
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/idea">
          <Nav.Link href="/idea">
            <FaLightbulb className={styles.icon} />
            Idea
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/chat">
          <Nav.Link href="/chat">
            <IoMdChatbubbles className={styles.icon} />
            Chat
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/course">
          <Nav.Link href="/course">
            <FaBook className={styles.icon} />
            Kelas
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        {isLogged ? (
          <Link href="/account">
            <Nav.Link href="/account">
              <FaUserCircle className={styles.icon} />
              Akun
            </Nav.Link>
          </Link>
        ) : (
          <Nav.Link onClick={authenticate}>
            <FaUserCircle className={styles.icon} />
            Akun
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
