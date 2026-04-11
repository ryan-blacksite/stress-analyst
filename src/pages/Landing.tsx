import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing__header">
        <div className="landing__brand">
          <span className="landing__mark" aria-hidden="true" />
          <span className="landing__brand-name">Stress Analyst</span>
        </div>
        <nav className="landing__nav">
          <a href="#capabilities">Capabilities</a>
          <a href="#workflow">Workflow</a>
        </nav>
      </header>

      <main className="landing__main">
        <section className="landing__hero">
          <p className="landing__eyebrow">Aerospace Structural Analysis</p>
          <h1 className="landing__title">
            Structural stress analysis, driven by an engineering agent.
          </h1>
          <p className="landing__lede">
            An analysis workspace for aerospace structures. Upload geometry,
            materials, loads, and environment definitions, then run margin-of-safety
            checks through a guided agent or dedicated analysis tools.
          </p>
          <div className="landing__cta">
            <Link to="/workspace" className="btn btn--primary">
              Start Analysis
            </Link>
            <a href="#capabilities" className="btn btn--ghost">
              Learn more
            </a>
          </div>
        </section>

        <section id="capabilities" className="landing__grid">
          <article className="landing__card">
            <h3>Full Analysis</h3>
            <p>
              End-to-end stress pipeline across all failure modes with a consolidated
              margins summary.
            </p>
          </article>
          <article className="landing__card">
            <h3>Buckling</h3>
            <p>Column and plate buckling with boundary-condition aware margins.</p>
          </article>
          <article className="landing__card">
            <h3>Bearing</h3>
            <p>Joint and lug bearing checks against allowables from the materials input.</p>
          </article>
          <article className="landing__card">
            <h3>Shear</h3>
            <p>Shear flow distribution and fastener shear margin evaluation.</p>
          </article>
        </section>
      </main>

      <footer className="landing__footer">
        <span>Stress Analyst &middot; Internal engineering preview</span>
      </footer>
    </div>
  );
}
