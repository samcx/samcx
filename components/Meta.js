import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#fdc82c"
      />
      <title>samsisle</title>
      <meta name="description" content="Hi! I'm Sam. Web Engineer." />
      <meta property="og:title" content="samsisle" />
      <meta property="og:description" content="Hi! I'm Sam. Web Engineer." />
      <meta
        property="og:image"
        content="https://samsisle.dev/static/yellow.png"
      />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}
