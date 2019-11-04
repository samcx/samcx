import React from 'react';
import App from 'next/app';

import Meta from '../components/Meta';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Bar from '../components/Bar';

import '../public/css/index.css';

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
                url('/Recoleta-Bold.woff2') format('woff2'),
                url('/Recoleta-Bold.woff') format('woff');
            }
            :root {
              --bg: white;
              --header-primary: rgba(0, 0, 0, 0.8);
              --border-primary: rgba(0, 0, 0, 0.2);
              --border-secondary: rgba(0, 0, 0, 0.1);
              --text-primary: rgba(0, 0, 0, 0.6);
              --hover: #fdc82c;
              --filter: brightness(1) grayscale(0);
            }
            [data-theme='dark'] {
              --bg: #131415;
              --header-primary: #fafbfc;
              --border-primary: rgba(255, 255, 255, 0.2);
              --border-secondary: rgba(255, 255, 255, 0.1);
              --text-primary: #eaeaea;
              --hover: #66757f;
              --filter: brightness(0.75) grayscale(1);
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
