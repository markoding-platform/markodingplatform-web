import '../styles/globals.scss';
import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IdeaFormProvider } from 'components/context/IdeaContext';
import SkilvulToken from 'libraries/SkilvulToken';
import FirebaseCloudMessaging from 'libraries/FirebaseCloudMessaging';
import init from 'libraries/SentryInit';

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
    FirebaseCloudMessaging();
    init();
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
          <link
            rel="preload"
            href="/fonts/Bungee/Bungee-Regular.ttf"
            as="font"
            crossOrigin=""
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
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
        <IdeaFormProvider>
          <Component {...pageProps} />
        </IdeaFormProvider>
      </>
    );
  }
}
