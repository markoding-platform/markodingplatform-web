import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from 'components/PointBadgeWrapper/styles.module.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import getCookie from 'utils/getCookie';
import { Logout, SSO } from 'utils/auth';
import Image from 'next/image';
import canUseDOM from 'utils/canUseDOM';
import Avatar from 'svgs/avatar.svg';
import useMySkilvulAccount from 'hooks/useMySkilvulAccount';
import number from 'utils/number';

const AuthButton = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(null);
  const userIdea = canUseDOM && getCookie('userIdea');
  const userProfile = canUseDOM && getCookie('userProfile');
  const idea = userIdea ? JSON.parse(userIdea) : {};
  const profile = userProfile ? JSON.parse(userProfile) : {};
  const ideaId = idea?.id || '';
  const profileType = profile?.profileType || '';

  const account = canUseDOM ? JSON.parse(getCookie('userAccount')) : {};
  const avatarUrl = account?.imageUrl || '';
  const { data } = useMySkilvulAccount();
  const mPoint = data
    ? data.totalPoint + (account ? account.markodingPoint : 0)
    : 0;
  const skilvulBadge = data ? data.totalBadge : 0;

  const checkAccount = () => {
    const logged = getCookie('markodingToken');
    const name = getCookie('userName');

    setIsLogged(logged || false);
    setUserName(name || null);
  };

  const isStudent = useMemo(() => {
    if (profileType === 'student') {
      return true;
    }
    return false;
  }, [profileType]);

  const isAllowedRegisterIdea = useMemo(() => {
    if (isStudent && !ideaId) {
      return true;
    }
    return false;
  }, [ideaId, isStudent]);

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
                src={avatarUrl || Avatar}
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
              <a href="/dashboard">
                <Link href="/dashboard">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr-2">
                      <Image
                        src={Avatar}
                        width={56}
                        height={56}
                        layout="fixed"
                        className="rounded-circle"
                      />
                    </div>
                    <div>
                      <h5 className="mb-1 text-nowrap">{userName}</h5>
                      <span className="text-primary text-nowrap">
                        {`${number(skilvulBadge)} MBadge | ${number(
                          mPoint
                        )} MPoin`}
                      </span>
                    </div>
                  </div>
                </Link>
              </a>
            </div>
            {isAllowedRegisterIdea && (
              <Link href="/register-idea">
                <Dropdown.Item href="/register-idea" className="text-primary">
                  Registrasi Ide Solusi
                </Dropdown.Item>
              </Link>
            )}
            <Link href="/dashboard">
              <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
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
