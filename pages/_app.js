import React from 'react';
import App from 'next/app';

import Meta from '../components/Meta';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Bar from '../components/Bar';

import '../static/css/index.css';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Meta />
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Bar />
      </>
    );
  }
}
