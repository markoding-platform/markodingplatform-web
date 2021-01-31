import Link from 'next/link';
import { FiMail } from 'react-icons/fi';

import Icon from 'components/Icons';
import skilvulLogo from 'public/assets/skilvul-logo-with-text.png';
import icWebsite from 'svgs/ic-website.svg';
import icFacebook from 'svgs/ic-facebook.svg';
import icYoutube from 'svgs/ic-youtube.svg';
import icInstagram from 'svgs/ic-instagram.svg';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './style.module.scss';

const footerData = [
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
        link: '/course',
      },
      {
        text: 'Blog',
        link: '/blog',
      },
      {
        text: 'Forum Diskusi',
        link: '/question',
      },
    ],
  },
  {
    head: 'UNICEF',
    children: [
      {
        text: 'Instagram',
        link: 'https://www.instagram.com/unicefindonesia',
        icon: icInstagram,
      },
      {
        text: 'Facebook',
        link: 'https://www.facebook.com/UNICEFIndonesia',
        icon: icFacebook,
      },
      {
        text: 'Youtube',
        link: 'https://www.youtube.com/user/unicefindonesia',
        icon: icYoutube,
      },
      {
        text: 'Website',
        link: 'https://www.unicef.org/indonesia',
        icon: icWebsite,
      },
    ],
  },
  {
    head: 'MARKODING',
    children: [
      {
        text: 'Instagram',
        link: 'https://instagram.com/markoding',
        icon: icInstagram,
      },
      {
        text: 'Facebook',
        link: 'https://www.facebook.com/markodingID/',
        icon: icFacebook,
      },
      {
        text: 'Youtube',
        link: 'https://www.youtube.com/channel/UCxPh-UrSnGhLLRFv8gz-7tA',
        icon: icYoutube,
      },
      {
        text: 'Website',
        link: 'https://www.markoding.com',
        icon: icWebsite,
      },
    ],
  },
];

const description =
  'Digital Innovation Challenge atau Tantangan Inovasi Digital merupakan rangkaian program UNICEF bersama Yayasan Daya Kreasi Anak Bangsa (MARKODING) sebagai mitra implementasi. Program ini bertujuan untuk membantu mengembangkan dan melatih remaja dengan keterampilan abad ke-21, keterampilan digital, dan keterampilan kewirausahaan melalui metode pembelajaran inovatif berupa pelatihan intensif dan mentorship. Melalui program ini, UNICEF dan MARKODING menjangkau remaja-remaja di beberapa wilayah di Indonesia untuk menciptakan solusi digital yang inovatif dan berkontribusi untuk memecahkan masalah yang mereka temui dan mempengaruhi kehidupan mereka.';
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerRoot}>
        <Row>
          <Col xs={6} md={5}>
            <div className="pr-3">
              <h1 className={styles.dicLogo}>DIGITAL INNOVATION CHALLENGE</h1>
              <p className={styles.longText}>{description}</p>
            </div>
          </Col>
          <Col xs={6} md={7}>
            <Row>
              {footerData.map((fd) => (
                <Col xs={12} md={4} key={fd.head}>
                  <h3 className={styles.subtitle}>{fd.head}</h3>
                  <ul className="list-unstyled">
                    {fd.children.map((fdc) => (
                      <li key={fdc.text} className={styles.item}>
                        <Link href={fdc.link}>
                          <a href={fdc.link} target="_blank" rel="noreferrer">
                            {fdc.icon && (
                              <Icon src={fdc.icon} size={14} className="mr-2" />
                            )}
                            {fdc.text}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
      <div className={styles.contactRoot}>
        <Row>
          <Col md={6}>
            <div className="d-flex align-items-center">
              <p className={styles.contactText}>Learning platform by </p>
              <a href="https://skilvul.com" target="_blank" rel="noreferrer">
                <img
                  src={skilvulLogo}
                  className={styles.contactSkilvulIcon}
                  alt="skilvul logo"
                />
              </a>
            </div>
          </Col>
          <Col md={6}>
            <div className="d-md-flex justify-content-end align-items-center">
              <a href="mailto:contact@markoding.com">
                <FiMail className={styles.contactIcon} />
                <span className={styles.contactText}>
                  contact@markoding.com
                </span>
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
