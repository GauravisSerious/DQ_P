import "./GoalCard.css";

function GoalCard({ icon, title, subtitle, selected, onClick }) {
  return (
    <button
      className={`select-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${title} — ${subtitle}`}
    >
      <span className="select-card-icon" aria-hidden="true">{icon}</span>
      <strong>{title}</strong>
      <span className="select-card-subtitle">{subtitle}</span>
      {selected && <span className="select-card-check" aria-hidden="true">✓</span>}
    </button>
  );
}

export default GoalCard;
