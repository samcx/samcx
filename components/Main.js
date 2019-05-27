import Projects from './Projects';

export default function Main() {
  return (
    <main className="m0a pb4 w90 w80-d">
      <section className="pb4">
        <h1 className="fs24 fs36-t fs48-d pb3_2 recoleta">
          Hi! I'm Sam. Full-stack web developer. SoCal native. Beach lover.
        </h1>
        <p className="black60 fs16 fs20-td lh">
          The Ohio State University graduate. Student at{' '}
          <a
            className="bb pb0_5 hover"
            href="https://lambdaschool.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lambda School.
          </a>
        </p>
      </section>
      <Projects />
    </main>
  );
}
