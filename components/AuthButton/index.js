import Dropdown from 'react-bootstrap/Dropdown';
import styles from 'components/PointBadgeWrapper/styles.module.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getCookie from '../../utils/getCookie';
import OwnFetch from '../../libraries/OwnFetch';

const AuthButton = () => {
  const [isLogged, setIsLogged] = useState(false);

  const checkAccount = () => {
    const logged = getCookie('isLogged');
    setIsLogged(logged || false);
  };

  const authenticate = async () => {
    const response = await OwnFetch(`/api/auth`);
    if (response.ok) {
      const { payload, sig } = response.data;
      window.location.replace(
        `${process.env.SSO_WEB_URL}?sso=${payload}&sig=${sig}`
      );
    }
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
            Ariqah
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Akun</Dropdown.Item>
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
