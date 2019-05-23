import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <link rel="shortcut icon" href="/static/lib/favicon.ico" />
      <title>samsisle</title>
      <meta
        name="description"
        content="Full-stack web developer. SoCal native. Beach lover."
      />
      <meta property="og:title" content="samsisle" />
      <meta
        property="og:description"
        content="Full-stack web developer. SoCal native. Beach lover."
      />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}
