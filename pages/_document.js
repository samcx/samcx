/**
 * _document is only rendered on the server side and not on the client side
 * Event handlers like onClick can't be added to this file
 */

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <script
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: `!function(){window.isDark=!1;try{window.localStorage.getItem("dark-mode")&&(document.documentElement.setAttribute("data-theme","dark"),window.isDark=!0)}catch(t){}}();`
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
