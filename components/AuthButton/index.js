import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from 'components/PointBadgeWrapper/styles.module.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getCookie from 'utils/getCookie';
import { Logout, SSO } from 'utils/auth';

const AuthButton = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(null);

  const checkAccount = () => {
    const logged = getCookie('markodingToken');
    const name = getCookie('userName');
    setIsLogged(logged || false);
    setUserName(name || null);
  };

  const authenticate = async () => {
    await SSO();
  };

  const doLogout = async () => {
    await Logout({});
    checkAccount();
  };

  useEffect(() => {
    checkAccount();
  }, []);

  return (
    <>
      {isLogged ? (
        <Dropdown className={styles.dropDown}>
          <Dropdown.Toggle
            variant="link"
            id="dropdown-account"
            className={styles.account}
          >
            {userName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Link href="/account">
              <Dropdown.Item href="/account">Akun</Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={doLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button type="button" variant="warning" onClick={authenticate}>
          Daftar/Masuk
        </Button>
      )}
    </>
  );
};

export default AuthButton;
