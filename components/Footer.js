import { links } from '../static/links';

export default function Header() {
  return (
    <footer className="m0a pb40 pt40 w90 w80-d">
      <ul className="flex-m flex-row">
        {links.map(link => (
          <li className="mr20-d black60 fs16 pb10 pt10 hover" key={link.name}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
