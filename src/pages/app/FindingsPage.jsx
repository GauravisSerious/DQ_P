import { useState, useMemo } from "react";
import EmptyState from "../../components/EmptyState";
import FindingCard from "../../components/FindingCard";
import Panel from "../../components/Panel";
import { useAudit } from "../../context/AuditContext";

const severityOrder = ["red", "amber", "blue", "green"];
const severityLabels = { red: "Critical", amber: "Watch", blue: "Info", green: "Good" };

function FindingsPage() {
  const { findings } = useAudit();
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

  return (
    <main className="workspace-page">
      <Panel>
        <h2>Detailed findings</h2>
        <p className="helper-copy">Plain-language issues detected during your scan.</p>

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
        <div className="stack">{filtered.map((item) => <FindingCard key={item.text} {...item} />)}</div>
      </Panel>
    </main>
  );
}

export default FindingsPage;
