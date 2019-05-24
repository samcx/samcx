import { projects } from '../static/lib/projects';

export default function Projects() {
  return (
    <section className="pt4">
      <h2 className="bb bc20 black60 fs16 fs20-td fw500 pb2">Projects</h2>
      <ul className="flex-m flex-d flex-row">
        {projects.map(project => (
          <li className="bb b-d bc10 pb4 pt4 w30-d" key={project.title}>
            <div className="black60 fs14 fw500 category">{project.category}</div>
            <a href={project.view} target="_blank" rel="noopener noreferrer">
              <h3 className="fs24 fs36-d fw500 pb1 pt1 hover">{project.title}</h3>
            </a>
            <p className="black60 fs16 fw500 lh pb1 pt1">{project.description}</p>
            <a href={project.view} target="_blank" rel="noopener noreferrer">
              <span className="black60 fs14 mr1 hover">View</span>
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
