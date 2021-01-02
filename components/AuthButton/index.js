import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from 'components/PointBadgeWrapper/styles.module.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getCookie from 'utils/getCookie';
import { Logout, SSO } from 'utils/auth';
import Image from 'next/image';

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
            drop="left"
            variant="link"
            id="dropdown-account"
            className={styles.account}
          >
            <div className={styles.accountImage}>
              <Image
                src="/assets/avatar-min.png"
                width={32}
                height={32}
                layout="fixed"
                className="rounded-circle"
              />
            </div>
            <span className={styles.accountName}>{userName}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight className={styles.dropDownAccount}>
            <div className={styles.dropDownAccountInfo}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <Image
                    src="/assets/avatar-min.png"
                    width={56}
                    height={56}
                    layout="fixed"
                    className="rounded-circle"
                  />
                </div>
                <div>
                  <h5 className="mb-1 text-nowrap">{userName}</h5>
                  <span className="text-primary text-nowrap">
                    0 MBadge | 0 MPoin
                  </span>
                </div>
              </div>
            </div>
            <Link href="/register-idea">
              <Dropdown.Item href="/register-idea" className="text-primary">
                Registrasi Ide Solusi
              </Dropdown.Item>
            </Link>
            <Link href="/account">
              <Dropdown.Item href="/dashboard">Lihat Profil</Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={doLogout}>Keluar</Dropdown.Item>
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
