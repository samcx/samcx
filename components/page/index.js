import Head from '~components/Head'

import styles from './page.module.css'

export default function Page({ children }) {
  return (
    <div className={styles.wrapper}>
      <Head />
      <main>{children}</main>
    </div>
  )
}
