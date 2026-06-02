import { Link, useNavigate } from "react-router-dom";
import LoadingState from "../../components/LoadingState";
import Panel from "../../components/Panel";
import PillarCard from "../../components/PillarCard";
import StepBar from "../../components/StepBar";
import ErrorState from "../../components/ErrorState";
import Button from "../../components/Button";
import { useAudit } from "../../context/AuditContext";
import { pillarsByAudit } from "../../data/pillars";

function RunningAuditPage() {
  const navigate = useNavigate();
  const { selectedAudit, auditProgress, running, error, resetFlow } = useAudit();
  const pillars = pillarsByAudit[selectedAudit] || [];
  const percent = auditProgress.total ? Math.round((auditProgress.step / auditProgress.total) * 100) : 0;

  const handleCancel = () => {
    resetFlow();
    navigate("/app/audit");
  };

  return (
    <main className="workspace-page">
      <Panel className="running-panel">
        <p className="eyebrow">Audit in progress</p>
        <h1>Scanning your data quality pillars</h1>
        <p className="helper-copy">We are validating schema quality, identity integrity, attribution consistency, and event reliability.</p>
        {error ? <ErrorState message={error} /> : null}
        {running ? <LoadingState title="Processing your checks" subtitle={auditProgress.status} /> : null}
        <div className="stack" role="list" aria-label="Audit pillars progress">
          {pillars.map((pillar, index) => {
            const state = index < auditProgress.step ? "done" : index === auditProgress.step ? "running" : "queued";
            return <PillarCard key={pillar} title={pillar} state={state} />;
          })}
        </div>
        <div className="progress-rail" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`Audit progress: ${percent}%`}>
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="status-row">
          <strong>{percent}%</strong>
          <span>{auditProgress.status}</span>
        </div>
        <div className="running-actions">
          {running ? (
            <Button kind="ghost" onClick={handleCancel}>Cancel audit</Button>
          ) : null}
          {!running && !error ? <Link className="btn btn-primary" to="/app/results">Open audit report</Link> : null}
          {error ? <Button onClick={handleCancel}>Back to wizard</Button> : null}
        </div>
      </Panel>
    </main>
  );
}

export default RunningAuditPage;
