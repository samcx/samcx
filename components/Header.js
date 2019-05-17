import css from '../css/header.css';

export default function Header() {
  return (
    <header className={css.header}>
      <img src="/static/svg/2600.svg" className={css.sun} alt="sun" />
    </header>
  );
}
