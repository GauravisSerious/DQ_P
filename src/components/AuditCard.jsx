import "./AuditCard.css";

function AuditCard(props) {
  return (
    <button
      className={`audit-card ${props.selected ? "selected" : ""}`}
      onClick={props.onClick}
      role="radio"
      aria-checked={props.selected}
      aria-label={`${props.title}: ${props.description}`}
    >
      <span className="audit-radio" aria-hidden="true">
        {props.selected && <span className="audit-radio-dot" />}
      </span>
      <span className="audit-icon" aria-hidden="true">{props.icon}</span>
      <div>
        <strong>{props.title}</strong>
        <p>{props.description}</p>
      </div>
    </button>
  );
}

export default AuditCard;
