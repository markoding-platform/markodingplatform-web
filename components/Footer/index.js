import Link from 'next/link';
import { BiPhone } from 'react-icons/bi';
import { FiMail } from 'react-icons/fi';

import Icon from 'components/Icons';
import MarkodingLogo from 'components/MarkodingLogo';
import icFacebook from 'svgs/ic-facebook.svg';
import icYoutube from 'svgs/ic-youtube.svg';
import icInstagram from 'svgs/ic-instagram.svg';

import {
  footerContainer,
  markodingMessage,
  footerItem,
  footerChild,
  leftSide,
  textBold,
  contacts,
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
    <div className="px-4 mt-5 d-flex justify-content-between">
      <div className={leftSide}>
        <MarkodingLogo />
        <h6 className={markodingMessage}>
          Kami memberdayakan remaja yang kurang beruntung dengan mengajarkan
          coding kepada siswa sekolah menengah atas di daerah marjinal di
          Indonesia.
        </h6>
      </div>
      <div className="d-flex w-50">
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
    <div className="d-flex justify-content-between px-4">
      <p className="text-secondary">
        {/* eslint-disable react/jsx-one-expression-per-line */}©
        <span className={textBold}>2020 MARKODING</span>. All Rights Reserved
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
