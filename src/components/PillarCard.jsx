import "./PillarCard.css";

function PillarCard({ title, state }) {
  return (
    <div className={`pillar-card ${state}`} role="listitem" aria-label={`${title}: ${state}`}>
      <span className="pillar-icon" aria-hidden="true">
        {state === "done" ? "✓" : state === "running" ? "●" : "○"}
      </span>
      <span className="pillar-title">{title}</span>
      {state === "running" && <span className="pillar-pulse" aria-hidden="true" />}
      {state === "done" && <span className="pillar-done-label">Complete</span>}
    </div>
  );
}

export default PillarCard;
