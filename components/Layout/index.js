import PropTypes from 'prop-types';
import React from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';

import Footer from 'components/Footer';
import BottomNavigation from 'components/BottomNavigation';
import Header from 'components/Header';

const Layout = ({ children, activeMenu, withFooter }) => {
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
        <meta name="keywords" content="Markoding" />
        <title>Markoding Platform</title>
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid>
        <div className="d-block d-lg-flex justify-content-between">
          <div className="desktop-left-section">
            <Header />
          </div>
          <div className="flex-grow-1 desktop-right-section">
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
