import Link from 'next/link';
import Card from 'react-bootstrap/Card';

import Icon from 'components/Icons';
import FansIcon from 'svgs/fans.svg';
import TeachingIcon from 'svgs/teaching.svg';
import Fans2 from 'svgs/fans-2.svg';
import Campus from 'svgs/campus.svg';

import {
  styCardHeader,
  styAccountTypesContainer,
  styIcon,
} from './styles.module.scss';

const RegisterAsComponent = () => {
  const ACCOUNT_TYPES = [
    {
      id: 0,
      title: 'Siswa',
      subTitle: 'Untuk siswa, kelas partisipasi, anggota klub',
      icon: <Icon src={FansIcon} />,
      link: '/signup/siswa',
    },
    {
      id: 1,
      title: 'Guru',
      subTitle:
        'Untuk guru, tim pengajar, admin, pelatih,  klub advisors, teknologi intrusual',
      icon: <Icon src={Campus} />,
      link: '/signup/guru',
    },
    {
      id: 2,
      title: 'Mentor',
      subTitle: 'Untuk mentor',
      icon: <Icon src={TeachingIcon} />,
      link: '/signup/mentor',
    },
    {
      id: 3,
      title: 'Supporter',
      subTitle: 'Untuk suporter tim',
      icon: <Icon src={Fans2} />,
      link: '/signup/supporter',
    },
  ];
  return (
    <div>
      <Card>
        <Card.Header className={styCardHeader}>
          <h2>Daftar Sebagai</h2>
        </Card.Header>
        <div className="mb-3">
          <p className="text-center text-secondary">
            Sebelum memulai perjalananmu yuk cerita tentang dirimu
          </p>
        </div>
        <ul className={styAccountTypesContainer}>
          {ACCOUNT_TYPES.map((item) => (
            <Link key={item.id} href={item.link}>
              <li>
                <div className={styIcon}>{item.icon}</div>
                <div>
                  <h5 className="text-black">{item.title}</h5>
                  <p className="text-secondary">{item.subTitle}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default RegisterAsComponent;
