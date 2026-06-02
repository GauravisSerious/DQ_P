import { Link } from "react-router-dom";
import EmptyState from "../../components/EmptyState";
import FindingCard from "../../components/FindingCard";
import Panel from "../../components/Panel";
import ScoreGauge from "../../components/ScoreGauge";
import ScoreTable from "../../components/ScoreTable";
import { useAudit } from "../../context/AuditContext";
import { useAuditSummary } from "../../hooks/useAuditSummary";

function getReadinessLabel(score) {
  if (score >= 85) return { text: "Excellent", cls: "readiness-excellent" };
  if (score >= 70) return { text: "Good", cls: "readiness-good" };
  if (score >= 50) return { text: "Needs work", cls: "readiness-warn" };
  return { text: "Critical", cls: "readiness-critical" };
}

function ResultsDashboardPage() {
  const { scores, findings, recommendations } = useAudit();
  const summary = useAuditSummary();
  if (!scores) {
    return (
      <main className="workspace-page">
        <Panel><EmptyState /></Panel>
      </main>
    );
  }
  return (
    <main className="workspace-page">
      <section className="results-hero">
        <Panel className="results-hero-panel">
          <section className="result-header">
            <ScoreGauge score={scores.score} />
            <div>
              <p className="eyebrow">Audit Confidence Score</p>
              <h1>{scores.verdict}</h1>
              <span className="tag">{scores.tag}</span>
              <p>{scores.blurb}</p>
            </div>
          </section>
          <div className="metric-strip">
            <article>
              <strong>{summary.score}</strong>
              <span>Confidence score</span>
            </article>
            <article>
              <strong>{summary.findingsCount}</strong>
              <span>Findings detected</span>
            </article>
            <article>
              <strong>{summary.actionsCount}</strong>
              <span>Recommended actions</span>
            </article>
          </div>
        </Panel>
      </section>

      <section className="results-grid">
        <Panel className="results-column">
          <h3>🔍 What we found</h3>
          <div className="stack">{findings.map((item) => <FindingCard key={item.text} {...item} />)}</div>
        </Panel>
        <Panel className="results-column">
          <h3>🚀 What to do next</h3>
          <div className="stack">{recommendations.map((item, idx) => <FindingCard key={item} severity="blue" text={`${idx + 1}. ${item}`} />)}</div>
        </Panel>
      </section>

      <section className="results-grid">
        <Panel className="results-column">
          <h3>📊 Detailed pillar scores</h3>
          <ScoreTable rows={scores.breakdown} />
          <div className="readiness-map">
            <h3>Readiness by category</h3>
            {scores.breakdown.map((item) => {
              const label = getReadinessLabel(item.score);
              return (
                <div className="readiness-row" key={item.pillar}>
                  <span>{item.pillar}</span>
                  <div className="readiness-bar">
                    <div style={{ width: `${item.score}%` }} />
                  </div>
                  <strong>{item.score}</strong>
                  <span className={`readiness-tag ${label.cls}`}>{label.text}</span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel className="results-column">
          <h3>🧠 Executive summary</h3>
          <div className="state-card">
            <p>
              Score {summary.score}. Your audit highlights {summary.findingsCount} key risks and {summary.actionsCount}{" "}
              action items. This means your data setup is usable, but prioritizing these fixes will improve reporting trust and AI readiness.
            </p>
          </div>
          <div className="result-actions">
            <Link className="btn btn-primary" to="/app/findings">View all findings</Link>
            <Link className="btn btn-ghost" to="/app/recommendations">View recommendations</Link>
          </div>
        </Panel>
      </section>
    </main>
  );
}

export default ResultsDashboardPage;
