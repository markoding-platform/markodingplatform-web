import Link from 'next/link';

import MarkodingLogo from 'components/MarkodingLogo';
import {
  footerContainer,
  markodingMessage,
  footerItem,
  footerChild,
  leftSide,
  textBold,
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
      },
      {
        text: 'Facebook',
        link: '/',
      },
      {
        text: 'Youtube',
        link: '/',
      },
    ],
  },
];
const Footer = () => (
  <section className={footerContainer}>
    <div className="px-4 mt-5 d-flex">
      <div className={leftSide}>
        <MarkodingLogo />
        <h6 className={markodingMessage}>
          Kami memberdayakan remaja yang kurang beruntung dengan mengajarkan
          coding kepada siswa sekolah menengah atas di daerah marjinal di
          Indonesia.
        </h6>
      </div>
      <div className="d-flex w-75">
        {footerData.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={footerItem}>
            <h5>{item.head}</h5>
            <div className={footerChild}>
              {item.children.map((c, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Link key={idx} href={c.link}>
                  {c.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <hr />
    <div className="d-flex justify-content-between">
      <p className="text-secondary">
        {/* eslint-disable react/jsx-one-expression-per-line */}©
        <span className={textBold}>2020 MARKODING</span>. All Rights Reserved
      </p>
      <div className="d-flex justify-content-between">
        <p className="text-secondary">+628123456789</p>
        <p className="text-secondary">info@markoding.com</p>
      </div>
    </div>
  </section>
);

export default Footer;
