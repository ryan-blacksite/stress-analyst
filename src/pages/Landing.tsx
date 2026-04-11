import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing__header">
        <div className="landing__brand">
          <span className="landing__mark" aria-hidden="true" />
          <span className="landing__brand-text">Stress Analyst</span>
        </div>
      </header>

      <main className="landing__main">
        <div className="landing__hero">
          <p className="landing__eyebrow">Aerospace Structural Analysis</p>
          <h1 className="landing__title">
            A stress analyst that works
            <br />
            the way you do.
          </h1>
          <p className="landing__lede">
            Converse with a structural analysis agent, review its work on a live
            canvas, and keep engineering judgment in the loop.
          </p>
          <div className="landing__cta">
            <Link to="/workspace" className="landing__btn">
              Start
              <span className="landing__btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="landing__footer">
        <span>Stress Analyst &middot; Engineering preview</span>
      </footer>
    </div>
  );
}
