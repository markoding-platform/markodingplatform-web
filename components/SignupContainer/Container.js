import Head from 'next/head';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterAsComponent from './RegisterAs';

const SignupContainer = () => {
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
        <Row>
          <Col />
          <Col xs={6}>
            <RegisterAsComponent />
          </Col>
          <Col />
        </Row>
      </Container>
    </>
  );
};

export default SignupContainer;
