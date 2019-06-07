/**
 * ./pages/index.js
 * 
 * This is the index page. Next.js + Now will automatically process
 * and render this page first upon loading https://samsisle.dev on 
 * the browser.
 */

import Meta from '../components/Meta';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Bar from '../components/Bar';

import '../css/index.css';

export default function index() {
  return (
    <>
      <Meta />
      <Header />
      <Main />
      <Footer />
      <Bar />
    </>
  );
}
