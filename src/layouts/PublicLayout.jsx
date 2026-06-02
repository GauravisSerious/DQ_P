import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <header className="marketing-nav glass-nav">
        <Link to="/" className="pub-brand" aria-label="DQ Pulse home">
          <span className="pub-brand-icon" aria-hidden="true">⚡</span>
          <span className="pub-brand-name">DQ Pulse</span>
        </Link>
        <nav aria-label="Marketing navigation">
          <a href="#bq-audit">BQ Audit</a>
          <a href="#msld">MSLD</a>
          <Link to="/auth">Sign In</Link>
          <Link className="nav-cta" to="/auth">Get Started</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
