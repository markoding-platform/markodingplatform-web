import { useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import RegisterAsComponent from './RegisterAs';
import SignupForm from './SignupForm';
import { ACCOUNT_TYPE } from './contants';
import { styRegisterContainer } from './styles.module.scss';

const SignupContainer = () => {
  const router = useRouter();
  const { slug } = router.query;

  const accountTypeIndex = useMemo(() => {
    return ACCOUNT_TYPE.findIndex((el) => el === slug);
  });

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
        <div className={styRegisterContainer}>
          {slug && accountTypeIndex !== -1 ? (
            <SignupForm registerAs={ACCOUNT_TYPE[accountTypeIndex]} />
          ) : (
            <RegisterAsComponent />
          )}
        </div>
      </Container>
    </>
  );
};

export default SignupContainer;
