import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fdc82c" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="preload"
        href="/Recoleta-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="annonymous"
      />
      <title>samsisle</title>
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content="Hi! I'm Sam. Web Engineer." />
      <meta property="og:title" content="samsisle" />
      <meta property="og:description" content="Hi! I'm Sam. Web Engineer." />
      <meta property="og:image" content="https://samsisle.dev/yellow.png" />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
}
