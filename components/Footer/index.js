import Link from 'next/link';
import { BiPhone } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';

import Icon from 'components/Icons';
import skilvulLogo from 'public/assets/skilvul-logo-with-text.png';
import dicLogo from 'public/assets/dic-logo.png';
import icFacebook from 'svgs/ic-facebook.svg';
import icYoutube from 'svgs/ic-youtube.svg';
import icInstagram from 'svgs/ic-instagram.svg';

import {
  footerContainer,
  markodingMessage,
  footerItem,
  footerChild,
  leftSide,
  stySkilvul,
  contacts,
  footerInner,
  footerInfo,
} from './style.module.scss';

const footerData = [
  {
    head: 'Informasi Lain',
    children: [
      {
        text: 'Masuk',
        link: '/',
      },
      {
        text: 'Daftar',
        link: '/',
      },
    ],
  },
  {
    head: 'Layanan',
    children: [
      {
        text: 'Event',
        link: '/event',
      },
      {
        text: 'Ide Solusi',
        link: '/idea',
      },
      {
        text: 'Kelas',
        link: '/',
      },
      {
        text: 'Blog',
        link: '/',
      },
      {
        text: 'Forum Diskusi',
        link: '/',
      },
    ],
  },
  {
    head: 'Social Media',
    children: [
      {
        text: 'Instagram',
        link: '/',
        icon: icInstagram,
      },
      {
        text: 'Facebook',
        link: '/',
        icon: icFacebook,
      },
      {
        text: 'Youtube',
        link: '/',
        icon: icYoutube,
      },
    ],
  },
];
const Footer = () => (
  <section className={footerContainer}>
    <div className={footerInner}>
      <div className={leftSide}>
        <div className="pt-2">
          <Link href="/">
            <a>
              <img
                src={dicLogo}
                width="406px"
                height="24px"
                alt="digital innovation challenge logo"
              />
            </a>
          </Link>
        </div>
        <h6 className={markodingMessage}>
          Kami memberdayakan remaja yang kurang beruntung dengan mengajarkan
          coding kepada siswa sekolah menengah atas di daerah marjinal di
          Indonesia.
        </h6>
      </div>
      <div className={footerInfo}>
        {footerData.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={footerItem}>
            <h5>{item.head}</h5>
            <div className={footerChild}>
              {item.children.length && (
                <>
                  {item.children.map((c = {}, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Link key={idx} href={c.link}>
                      <div>
                        {c.icon && (
                          <Icon src={c.icon} size={14} className="mr-2" />
                        )}
                        {c.text}
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    <hr />
    <div className="d-flex justify-content-between flex-wrap px-4 mb-5">
      <p className="text-secondary">
        <span className="pr-2">Learning Platform by</span>
        <Link href="/">
          <a>
            <img src={skilvulLogo} className={stySkilvul} alt="skilvul logo" />
          </a>
        </Link>
      </p>
      <div className={contacts}>
        <p className="text-secondary">
          <BiPhone className="pr-1" size={20} />
          <span>+628123456789</span>
        </p>
        <p className="text-secondary">
          <FiMail className="pr-1" size={20} />
          <span>info@markoding.com</span>
        </p>
      </div>
    </div>
  </section>
);

export default Footer;
