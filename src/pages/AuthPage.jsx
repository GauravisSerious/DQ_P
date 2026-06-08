import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAudit } from "../context/AuditContext";

export default function AuthPage() {
  const { signIn } = useAudit();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 600));
      signIn("user@google.com");
      navigate("/app/audit");
    } catch {
      setError("Sign-in failed. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      {/* Subtle grid bg */}
      <div className="auth-grid-bg" aria-hidden="true"/>

      {/* ── TOP NAV BAR ─────────────────────────────────────────── */}
      <header className="auth-topnav">
        <Link to="/" className="auth-topnav-brand" aria-label="DQ Pulse home">
          <span className="auth-brand-icon" aria-hidden="true">⚡</span>
          <span className="auth-brand-name">DQ PULSE</span>
        </Link>
        <span className="auth-topnav-tagline">Data Quality Intelligence Platform</span>
      </header>

      {/* ── MAIN SPLIT ──────────────────────────────────────────── */}
      <div className="auth-centered">

        {/* LEFT — value props */}
        <section className="auth-value-side" aria-label="Platform benefits">
          <h1>Audit your BigQuery data with confidence.</h1>
          <p className="auth-value-sub">
            Connect once. Get severity-coded findings, confidence scores, and prioritised action plans — no SQL or manual scripts required.
          </p>

          <ul className="auth-props-list" style={{ marginBottom: "32px" }}>
            <li>
              <span className="auth-prop-icon auth-prop-green" aria-hidden="true">✓</span>
              <span>Read-only BigQuery scanning — zero data mutation</span>
            </li>
            <li>
              <span className="auth-prop-icon auth-prop-blue" aria-hidden="true">⚡</span>
              <span>Plain-language scorecards for leadership &amp; engineers</span>
            </li>
            <li>
              <span className="auth-prop-icon auth-prop-amber" aria-hidden="true">📊</span>
              <span>AI-readiness summary with prioritised next moves</span>
            </li>
            <li>
              <span className="auth-prop-icon auth-prop-red" aria-hidden="true">🔒</span>
              <span>SOC2 Compliant &amp; OAuth Secure</span>
            </li>
          </ul>

          <div className="trust-section" style={{ marginTop: "0" }}>
            <h3>WHAT DQ PULSE EVALUATES</h3>
            <p className="helper-copy" style={{ marginBottom: 16 }}>Our audit validates your analytics architecture across core reliability dimensions:</p>
            <div className="trust-grid">
              <div className="trust-card">
                <span className="trust-icon">✓</span>
                <div>
                  <strong>Data Quality</strong>
                  <p>Detect null fields, schema drift, and freshness issues.</p>
                </div>
              </div>
              <div className="trust-card">
                <span className="trust-icon">✓</span>
                <div>
                  <strong>Tracking Integrity</strong>
                  <p>Validate event names, triggers, and parameter counts.</p>
                </div>
              </div>
              <div className="trust-card">
                <span className="trust-icon">✓</span>
                <div>
                  <strong>Attribution Readiness</strong>
                  <p>Ensure click identifiers and source definitions align.</p>
                </div>
              </div>
              <div className="trust-card">
                <span className="trust-icon">✓</span>
                <div>
                  <strong>AI & ML Readiness</strong>
                  <p>Check features availability and prediction label latency.</p>
                </div>
              </div>
              <div className="trust-card">
                <span className="trust-icon">✓</span>
                <div>
                  <strong>Governance & Compliance</strong>
                  <p>Audit GDPR consent flags and detect plain-text PII.</p>
                </div>
              </div>
              <div className="trust-card">
                <span className="trust-icon">✓</span>
                <div>
                  <strong>Marketing Measurement Reliability</strong>
                  <p>Ensure UTM query tags match ad configurations.</p>
                </div>
              </div>
              <div className="trust-card">
                <span className="trust-icon text-blue">✓</span>
                <div>
                  <strong>Actionable Recommendations</strong>
                  <p>Get prioritized steps to remediate identified anomalies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT — sign-in card */}
        <section className="auth-signin-side" aria-label="Sign in">
          <div className="auth-modal-card">
            <div className="auth-modal-top">
              <h2>Sign in to your workspace</h2>
              <p>Access your audit dashboard via your Google account.</p>
            </div>

            {error && (
              <div className="auth-error-banner" role="alert">
                <span className="auth-err-icon" aria-hidden="true">!</span>
                {error}
              </div>
            )}

            <button
              className="google-signin-btn"
              onClick={login}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="spinner" aria-hidden="true"/>
              ) : (
                <svg className="google-g" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              <span>{loading ? "Signing in…" : "Continue with Google"}</span>
            </button>

            <p className="auth-compliance">🔒 SOC2 Compliant · OAuth 2.0 · Read-only access</p>

            <p className="auth-email-fallback">
              Need to sign in with email?{" "}
              <button className="auth-email-link" onClick={() => alert("Email sign-in coming soon.")}>
                Click here
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
