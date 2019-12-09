import { projects } from '../lib/projects';

export default function Projects() {
  return (
    <section className="pt40">
      <h2 className="bb bc20 black60 fs16 fs20-td pb20">Projects</h2>
      <ul className="flex-m flex-d flex-row">
        {projects.map(project => (
          <li className="bb b-d bc10 pb40 pt40 w30-d" key={project.title}>
            <div className="black60 fs14 fw500 category">{project.category}</div>
            <a href={project.view} target="_blank" rel="noopener noreferrer">
              <h3 className="fs24 fs36-d fw500 pb10 pt10 recoleta hover">{project.title}</h3>
            </a>
            <p className="black60 fs16 lh pb10 pt10">{project.description}</p>
            <a href={project.view} target="_blank" rel="noopener noreferrer">
              <span className="black60 fs14 mr10 hover">View</span>
            </a>
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              <span className="black60 fs14 hover">Source</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
