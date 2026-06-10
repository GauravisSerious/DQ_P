import { Link } from "react-router-dom";

const BQ_CAPABILITIES = [
  "Data Quality Assessment",
  "Tracking Integrity Validation",
  "AI & ML Readiness Review",
  "Governance & Compliance Checks",
  "Actionable Recommendations",
];

const MSLD_CAPABILITIES = [
  "Campaign Monitoring",
  "Conversion Leakage Detection",
  "Tracking Issue Identification",
  "Attribution Validation",
  "Marketing Performance Insights",
];

const STEPS = [
  {
    n: "1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" />
      </svg>
    ),
    title: "Define Goals",
    desc: "Map your growth model with specific business goals.",
  },
  {
    n: "2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
      </svg>
    ),
    title: "Select Scope",
    desc: "Choose audit depth, ML readiness, or tracking integrity.",
  },
  {
    n: "3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Sync Data",
    desc: "1-click secure connection to your BigQuery export dataset.",
  },
  {
    n: "4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    title: "Fix & Grow",
    desc: "Get severity-coded findings & fixes. Focus on growth.",
  },
];

function ProductCard({ id, title, desc, capabilities, cta, to, accentClass }) {
  return (
    <article id={id} className={`lp-product-card ${accentClass}`}>
      <div className="lp-product-header">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className="lp-product-preview">
        <ul className="lp-capabilities">
          {capabilities.map((cap) => (
            <li key={cap} className="lp-capability-item">
              <span className="lp-capability-check" aria-hidden="true">✓</span>
              <span className="lp-capability-text">{cap}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link className="btn btn-primary lp-cta" to={to}>{cta}</Link>
    </article>
  );
}

export default function LandingPage() {
  return (
    <main className="lp-root">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="lp-hero">
        <p className="eyebrow">Enterprise Data Readiness Platform</p>
        <h1>Secure your marketing intelligence<br/>with clarity and confidence.</h1>
        <p className="lp-hero-sub">
          Choose between auditing your BigQuery data quality or detecting media spend leaks to align your growth, product, and analytics teams on what to fix next.
        </p>
      </section>

      {/* ── PRODUCT CARDS ──────────────────────────────────────── */}
      <section className="lp-products">
        <ProductCard
          id="bq-audit"
          accentClass="lp-bq"
          title="BigQuery Data Audit"
          desc="Audit your BigQuery data quality with AI-ready guidance and actionable next steps."
          capabilities={BQ_CAPABILITIES}
          cta="Start Audit"
          to="/auth?module=audit"
        />

        <div className="lp-divider" aria-hidden="true"/>

        <ProductCard
          id="msld"
          accentClass="lp-msld"
          title="Media Spend Leak Detector"
          desc="Identify wasteful ad spend and optimize campaigns with automated tracking integrity checks."
          capabilities={MSLD_CAPABILITIES}
          cta="Start Monitoring"
          to="/auth?module=msld"
        />
      </section>

      {/* ── ONBOARDING STEPS ───────────────────────────────────── */}
      <section className="lp-onboarding">
        <p className="eyebrow" style={{ textAlign: "center" }}>How it works</p>
        <h2>Guided onboarding from sign-in to action plan</h2>
        <div className="lp-steps">
          {STEPS.map((s, i) => (
            <div key={s.n} className="lp-step-wrap">
              <article className="lp-step-card">
                <div className="lp-step-icon">{s.icon}</div>
                <span className="lp-step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
              {i < STEPS.length - 1 && (
                <div className="lp-step-arrow" aria-hidden="true">
                  <svg viewBox="0 0 32 16"><path d="M0 8h24m-6-5 6 5-6 5" fill="none" stroke="var(--border-mid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="lp-footer">
        © {new Date().getFullYear()} DQ Pulse · Secure · Read-only · Built for enterprise teams
      </footer>
    </main>
  );
}
