import { useState, useMemo } from "react";
import EmptyState from "../../components/EmptyState";
import FindingCard from "../../components/FindingCard";
import Panel from "../../components/Panel";
import ScoreGauge from "../../components/ScoreGauge";
import ScoreTable from "../../components/ScoreTable";
import StepBar from "../../components/StepBar";
import { useAudit } from "../../context/AuditContext";
import { useAuditSummary } from "../../hooks/useAuditSummary";
import { useCasesByAudit } from "../../data/useCases";

function getReadinessLabel(score) {
  if (score >= 85) return { text: "Excellent", cls: "readiness-excellent" };
  if (score >= 70) return { text: "Good", cls: "readiness-good" };
  if (score >= 50) return { text: "Needs work", cls: "readiness-warn" };
  return { text: "Critical", cls: "readiness-critical" };
}

const severityOrder = ["red", "amber", "blue", "green"];
const severityLabels = { red: "Critical", amber: "Watch", blue: "Info", green: "Good" };
const priorityStyles = { high: "priority-high", medium: "priority-medium", low: "priority-low" };
const priorityLabels = { high: "High Priority", medium: "Medium Priority", low: "Low Priority" };

function ResultsDashboardPage() {
  const { scores, findings, recommendations, selectedAudit } = useAudit();
  const summary = useAuditSummary();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const map = { red: 0, amber: 0, blue: 0, green: 0 };
    findings.forEach((f) => { if (map[f.severity] !== undefined) map[f.severity]++; });
    return map;
  }, [findings]);

  const filtered = useMemo(() => {
    if (filter === "all") return findings;
    return findings.filter((f) => f.severity === filter);
  }, [findings, filter]);

  const useCases = useCasesByAudit[selectedAudit] || useCasesByAudit.complete;

  if (!scores) {
    return (
      <main className="workspace-page">
        <Panel><EmptyState /></Panel>
      </main>
    );
  }
  return (
    <main className="workspace-page">
      {/* Global step bar — Step 6 Results */}
      <div className="wizard-topbar" style={{ position: 'relative', marginBottom: 20 }}>
        <div className="wizard-topbar-inner">
          <div className="wizard-topbar-meta">
            <p className="eyebrow" style={{ marginBottom: 0 }}>Guided setup · Step 6 of 6</p>
          </div>
          <StepBar current={6} total={6} />
        </div>
      </div>

      {/* ===== HERO SCORE ===== */}
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

      {/* ===== FINDINGS + NEXT STEPS (stacked vertically) ===== */}
      <section className="results-inline-section" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Panel className="results-column">
          <h3>📊 Audit Insights</h3>
          <div className="stack">{findings.map((item) => <FindingCard key={item.title || item.text} {...item} />)}</div>
        </Panel>
        <Panel className="results-column">
          <h3>🚀 What to do next</h3>
          <div className="action-plan-list" style={{ margin: "10px 0 0" }}>
            {recommendations.map((item, idx) => {
              const isDetailed = typeof item === "object" && item.title;
              const text = isDetailed ? item.title : item;
              return (
                <div key={text} className="action-plan-item" style={{ padding: "12px 14px" }}>
                  <span className="action-plan-number" style={{ width: 24, height: 24, fontSize: "0.78rem" }}>{idx + 1}</span>
                  <div className="action-plan-content">
                    <p style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--text-1)", margin: 0 }}>{text}</p>
                    {isDetailed && item.description && (
                      <p style={{ fontSize: "0.84rem", color: "var(--text-2)", marginTop: 4, margin: "4px 0 0" }}>
                        {item.description.length > 90 ? `${item.description.substring(0, 90)}...` : item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </section>

      {/* ===== PILLAR SCORES (full width - no executive summary beside it) ===== */}
      <section className="results-inline-section">
        <Panel>
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
      </section>

      {/* ===== INLINE FINDINGS SECTION ===== */}
      <section className="results-inline-section">
        <Panel>
          <h2>Key Findings</h2>
          <p className="helper-copy">Strategic intelligence summaries mapped directly to corrective recommendations.</p>

          {findings.length > 0 && (
            <div className="findings-summary-bar">
              <button
                className={`findings-filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All ({findings.length})
              </button>
              {severityOrder.map((sev) =>
                counts[sev] > 0 ? (
                  <button
                    key={sev}
                    className={`findings-filter-btn severity-filter-${sev} ${filter === sev ? "active" : ""}`}
                    onClick={() => setFilter(sev)}
                  >
                    <span className={`dot-inline ${sev}`} aria-hidden="true" />
                    {severityLabels[sev]} ({counts[sev]})
                  </button>
                ) : null
              )}
            </div>
          )}

          {!findings.length ? <EmptyState subtitle="No findings available yet. Run an audit first." /> : null}
          <div className="stack">{filtered.map((item) => <FindingCard key={item.title || item.text} {...item} />)}</div>
        </Panel>
      </section>

      {/* ===== INLINE RECOMMENDATIONS / ACTION PLAN ===== */}
      <section className="results-inline-section">
        <Panel>
          <h2>Recommendations</h2>
          <p className="helper-copy">Actions prioritized for business impact and effort.</p>
          {!recommendations.length ? <EmptyState subtitle="Run an audit to generate recommendations." /> : null}

          {recommendations.length > 0 && (
            <>
              <h3>Action plan</h3>
              <div className="action-plan-list">
                {recommendations.map((item, idx) => {
                  /* Support both old string format and new detailed object format */
                  const isDetailed = typeof item === "object" && item.title;
                  return (
                    <div className={`action-plan-item ${isDetailed ? 'action-plan-detailed' : ''}`} key={isDetailed ? item.title : item}>
                      <span className="action-plan-number">{idx + 1}</span>
                      <div className="action-plan-content">
                        {isDetailed ? (
                          <>
                            <div className="action-plan-header">
                              <strong className="action-plan-title">{item.title}</strong>
                                <span className={`action-priority-badge ${priorityStyles [item.priority] || ''}`}>
                                {priorityLabels[item.priority] || item.priority}
                                </span>
                            </div>
                            <p className="action-plan-desc">{item.description}</p>
                            <div className="action-plan-impact">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                              <span><strong>Expected impact:</strong> {item.impact}</span>
                            </div>
                          </>
                        ) : (
                          <p>{item}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Panel>
      </section>

      {/* ===== RECOMMENDED USE CASES ===== */}
      {useCases.length > 0 && (
        <section className="results-inline-section">
          <Panel>
            <h2>Recommended use cases</h2>
            <p className="helper-copy">Based on your audit results, here are high-value use cases you can now pursue.</p>
            <div className="usecase-grid">
              {useCases.map((item) => (
                <div className="usecase-card-v2" key={item.id}>
                  <span className="usecase-icon" aria-hidden="true">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      )}
    </main>
  );
}

export default ResultsDashboardPage;
