import { Link, useNavigate } from "react-router-dom";
import LoadingState from "../../components/LoadingState";
import Panel from "../../components/Panel";
import PillarCard from "../../components/PillarCard";
import StepBar from "../../components/StepBar";
import ErrorState from "../../components/ErrorState";
import Button from "../../components/Button";
import { useAudit } from "../../context/AuditContext";
import { msldPillars } from "../../data/msldData";

function MsldRunningPage() {
  const navigate = useNavigate();
  const { msldProgress, msldRunning, msldError, resetMsldFlow } = useAudit();
  const percent = msldProgress.total ? Math.round((msldProgress.step / msldProgress.total) * 100) : 0;

  const handleCancel = () => {
    resetMsldFlow();
    navigate("/app/msld");
  };

  return (
    <main className="workspace-page">
      <Panel className="running-panel" style={{ marginTop: "40px" }}>
        <p className="eyebrow">Leak detection scan active</p>
        <h1>Scanning campaign spend &amp; tracking metrics</h1>
        <p className="helper-copy">We are matching ad cost logs, checking URL tags, validating pixel parameters, and auditing conversion triggers.</p>
        
        {msldError ? <ErrorState message={msldError} /> : null}
        {msldRunning ? <LoadingState title="Scanning spend integrity" subtitle={msldProgress.status} /> : null}
        
        <div className="stack" role="list" aria-label="Attribution pillars progress">
          {msldPillars.map((pillar, index) => {
            const state = index < msldProgress.step ? "done" : index === msldProgress.step ? "running" : "queued";
            return <PillarCard key={pillar} title={pillar} state={state} />;
          })}
        </div>
        
        <div className="progress-rail" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`Scan progress: ${percent}%`}>
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        
        <div className="status-row">
          <strong>{percent}%</strong>
          <span>{msldProgress.status}</span>
        </div>
        
        <div className="running-actions">
          {msldRunning ? (
            <Button kind="ghost" onClick={handleCancel}>Cancel scan</Button>
          ) : null}
          {!msldRunning && !msldError ? <Link className="btn btn-primary" to="/app/msld/results">Open leak report</Link> : null}
          {msldError ? <Button onClick={handleCancel}>Back to start</Button> : null}
        </div>
      </Panel>
    </main>
  );
}

export default MsldRunningPage;
