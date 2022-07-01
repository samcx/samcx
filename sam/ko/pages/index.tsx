import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>samsisle</title>
        <meta name="og:title" content="Sam Ko. Web Engineer." />
        <meta name="description" content="Sam Ko. Web Engineer." />
        <meta name="og:description" content="Sam Ko. Web Engineer." />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
      </Head>
      <main>
        <Image src="/retro.svg" alt="retro" width="300" height="31" />
      </main>
    </>
  )
}

export const config = {
  unstable_runtimeJS: false,
}

export default Index
