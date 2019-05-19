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
      <section className={css.section__2}>
        <h2 className={css.title__2}>Projects</h2>
        <ul className={css.projects}>
          <li className={css.project}>
            <span className={css.category}>Personal</span>
            <a>
              <h3 className={css.title__3}>Emojiest</h3>
            </a>
            <p className={css.description}>
              A simple source for all your favorite emojis.
            </p>
            <a>
              <span className={css.view}>View</span>
            </a>
            <a>
              <span className={css.source}>Source</span>
            </a>
          </li>
          <li className={css.project}>
            <span className={css.category}>Capstone</span>
            <a>
              <h3 className={css.title__3}>LearnLocker</h3>
            </a>
            <p className={css.description}>
              A web application that allows users to keep, track, and organize
              internet resources in one place.
            </p>
            <a>
              <span className={css.view}>View</span>
            </a>
            <a>
              <span className={css.source}>Source</span>
            </a>
          </li>
          <li className={css.project}>
            <span className={css.category}>Personal</span>
            <a>
              <h3 className={css.title__3}>Instagram Twin</h3>
            </a>
            <p className={css.description}>
              A Lambda School project that closely mimics Instagram design.
            </p>
            <a>
              <span className={css.view}>View</span>
            </a>
            <a>
              <span className={css.source}>Source</span>
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
