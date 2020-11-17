import PropTypes from 'prop-types';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { FaLightbulb, FaBook, FaUserCircle } from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import styles from './styles.module.scss';

const BottomNavigation = (props) => {
  const { activeKey } = props;
  return (
    <Nav className="justify-content-between nav-bottom" activeKey={activeKey}>
      <Nav.Item>
        <Link href="/">
          <Nav.Link href="/" className={styles.item}>
            <AiFillHome className={styles.icon} />
            Beranda
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/idea">
          <Nav.Link href="/idea" className={styles.item}>
            <FaLightbulb className={styles.icon} />
            Idea
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/chat">
          <Nav.Link href="/chat" className={styles.item}>
            <IoMdChatbubbles className={styles.icon} />
            Chat
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/kelas">
          <Nav.Link href="/kelas" className={styles.item}>
            <FaBook className={styles.icon} />
            Kelas
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/account">
          <Nav.Link href="/account" className={styles.item}>
            <FaUserCircle className={styles.icon} />
            Akun
          </Nav.Link>
        </Link>
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
