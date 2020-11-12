import '../styles/globals.scss';
import React from 'react';
import App from 'next/app';
import NextNprogress from 'nextjs-progressbar';

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

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <NextNprogress
          color="#2F80ED"
          startPosition={0.4}
          stopDelayMs={200}
          height="3"
          options={{
            showSpinner: false,
          }}
        />
        <Component {...pageProps} />
      </>
    );
  }
}
