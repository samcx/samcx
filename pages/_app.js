import React from 'react';
import App from 'next/app';

import Meta from '../components/Meta';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Bar from '../components/Bar';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Meta />
        <style jsx global>
          {`
            @font-face {
              font-display: swap;
              font-family: 'Recoleta';
              font-style: normal;
              font-weight: 700;
              src: local('Recoleta Bold'), local('Recoleta-Bold'),
                url('/static/Recoleta-Bold.woff2') format('woff2'),
                url('/static/Recoleta-Bold.woff') format('woff');
            }

            :root {
              --white: white;
              --black-10: rgba(0, 0, 0, 0.1);
              --black-20: rgba(0, 0, 0, 0.2);
              --black-60: rgba(0, 0, 0, 0.6);
              --black-80: rgba(0, 0, 0, 0.8);
              --bright-orange: #fdc82c;
            }

            * {
              box-sizing: border-box;
            }

            html {
              font-size: 62.5%;
            }
          `}
        </style>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Bar />
      </>
    );
  }
}
