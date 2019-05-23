import Projects from './Projects';

export default function Main() {
  return (
    <main className="m0a pb4 w90 w80-d">
      <section className="pb4">
        <h1 className="fs24 fs36-t fs48-d fw500 pb32">
          Hi! I'm Sam. Full-stack web developer. SoCal native. Beach lover.
        </h1>
        <p className="black60 fs16 fs20-td fw500 lh">
          The Ohio State University graduate. Student at Lambda School.
        </p>
      </section>
      <Projects />
    </main>
  );
}
