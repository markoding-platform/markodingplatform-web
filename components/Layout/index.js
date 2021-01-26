import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';

import Footer from 'components/Footer';
import BottomNavigation from 'components/BottomNavigation';
import Header from 'components/Header';

const Layout = ({ children, activeMenu, withFooter }) => {
  const [rightWidth, setRightWidth] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { innerWidth } = window;
      const rw = innerWidth - 290;
      setRightWidth(rw > 1200 ? `${rw}px` : '100%');
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="A social learning community platform"
        />
        <meta name="keywords" content={process.env.TITLE} />
        <title>{process.env.TITLE}</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Container fluid>
        <div className="d-block d-lg-flex justify-content-between">
          <div className="desktop-left-section">
            <Header />
          </div>
          <div
            className="flex-grow-1 desktop-right-section"
            style={
              rightWidth && {
                maxWidth: `${rightWidth}`,
              }
            }
          >
            {children}
            {withFooter && (
              <div className="d-none d-lg-block">
                <Footer />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white fixed-bottom d-block d-lg-none">
          <BottomNavigation activeKey={activeMenu} />
        </div>
      </Container>
    </>
  );
};

Layout.defaultProps = {
  activeMenu: '',
  withFooter: true,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  activeMenu: PropTypes.string,
  withFooter: PropTypes.bool,
};

export default Layout;
