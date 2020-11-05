import PropTypes from 'prop-types';
import Head from 'next/head'
import Container from 'react-bootstrap/Container'

const Layout = ({ children }) => {
    return (
      <>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
          />
          <meta name='description' content='A social learning community platform' />
          <meta name='keywords' content='Markoding' />
          <title>Markoding Platform</title>

          <link rel='manifest' href='/manifest.json' />
          <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
          <link rel='apple-touch-icon' href='/apple-icon.png' />
          <meta name='theme-color' content='#317EFB' />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container fluid>{children}</Container>
      </>
);
};

Layout.propTypes = {
	children: PropTypes.element.isRequired
};

export default Layout;
