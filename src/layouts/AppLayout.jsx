import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAudit } from "../context/AuditContext";

export default function AppLayout() {
  const { user, signOut, scores } = useAudit();
  const navigate = useNavigate();
  const hasResults = Boolean(scores);

  return (
    <div className="workspace-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="workspace-nav glass-nav">
        <div className="workspace-brand">
          <span className="brand-chip">⚡ DQ PULSE</span>
          <p>Data Quality Intelligence</p>
        </div>

        <nav aria-label="Main navigation">
          {/* Always accessible */}
          <NavLink to="/app/audit">New Audit</NavLink>

          {/* Locked until audit completes */}
          {hasResults ? (
            <>
              <NavLink to="/app/results">Audit Results</NavLink>
              <NavLink to="/app/findings">Detailed Findings</NavLink>
              <NavLink to="/app/recommendations">Recommendations</NavLink>
            </>
          ) : (
            <>
              <span className="nav-locked" title="Run an audit first">Audit Results</span>
              <span className="nav-locked" title="Run an audit first">Detailed Findings</span>
              <span className="nav-locked" title="Run an audit first">Recommendations</span>
            </>
          )}

          <NavLink to="/app/settings">Settings</NavLink>
        </nav>

        <div className="workspace-meta">
          {scores ? <span className="meta-pill score-pill">Score: {scores.score}</span> : null}
          <span className="meta-pill">{user?.email}</span>
          <button
            className="btn-signout"
            onClick={() => { signOut(); navigate("/"); }}
            aria-label="Sign out of your account"
          >
            Sign out
          </button>
        </div>
      </header>

      <div id="main-content">
        <Outlet />
      </div>
    </div>
  );
}
