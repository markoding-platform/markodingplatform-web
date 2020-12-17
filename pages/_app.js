import '../styles/globals.scss';
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalFormProvider } from 'components/context/FormContext';
import SkilvulToken from 'libraries/SkilvulToken';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };
    if (pageProps.statusCode && ctx.res) {
      ctx.res.statusCode = pageProps.statusCode;
    }
    return {
      pageProps,
    };
  }

  componentDidMount() {
    SkilvulToken();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            rel="preload"
            href="/fonts/Poppins/Poppins-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Poppins/Poppins-SemiBold.ttf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <NextNprogress
          color="#2F80ED"
          startPosition={0.4}
          stopDelayMs={200}
          height="3"
          options={{
            showSpinner: false,
          }}
        />
        <ToastContainer
          transition={Flip}
          position="top-center"
          autoClose={false}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnHover
          draggable
          progress="undefined"
        />
        <GlobalFormProvider>
          <Component {...pageProps} />
        </GlobalFormProvider>
      </>
    );
  }
}
