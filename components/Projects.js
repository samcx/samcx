import { projects } from '../static/lib/projects';

import css from '../css/projects.css';

export default function Projects() {
  return (
    <section className={css.section__2}>
      <h2 className={css.title__2}>Projects</h2>
      <ul className={css.projects}>
        {projects.map(project => (
          <li className={css.project} key={project.title}>
            <div className={css.category}>{project.category}</div>
            <a href={project.view} target="_blank" rel="noopener noreferrer">
              <h3 className={css.title__3}>{project.title}</h3>
            </a>
            <p className={css.description}>{project.description}</p>
            <a href={project.view} target="_blank" rel="noopener noreferrer">
              <span className={css.view}>View</span>
            </a>
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              <span className={css.source}>Source</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
