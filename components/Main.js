import Projects from './Projects';

import css from '../css/main.css';

export default function Main() {
  return (
    <main className={css.main}>
      <section className={css.section__1}>
        <h1 className={css.title__1}>
          Hi! I'm Sam. Full-stack web developer. Socal native. Beach lover.
        </h1>
        <p className={css.status}>
          The Ohio State University graduate. Student at Lambda School.
        </p>
      </section>
      <Projects />
    </main>
  );
}
