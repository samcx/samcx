import Head from '@components/Head'

import styles from './page.module.css'

export default function Page({ children }) {
  return (
    <>
      <Head />
      <main className={styles.wrapper}>{children}</main>
    </>
  )
}
