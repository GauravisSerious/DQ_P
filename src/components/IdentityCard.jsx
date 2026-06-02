import "./IdentityCard.css";

const iconMap = {
  yes: "✓",
  no: "✕",
  unknown: "?",
};

const colorMap = {
  yes: "identity-green",
  no: "identity-red",
  unknown: "identity-amber",
};

function IdentityCard(props) {
  const iconKey = props.title.toLowerCase() === "yes" ? "yes" : props.title.toLowerCase() === "no" ? "no" : "unknown";
  return (
    <button
      className={`identity-card ${props.selected ? "selected" : ""}`}
      onClick={props.onClick}
      aria-pressed={props.selected}
      aria-label={`${props.title}: ${props.description}`}
    >
      <span className={`identity-icon-badge ${colorMap[iconKey]}`} aria-hidden="true">
        {iconMap[iconKey]}
      </span>
      <strong>{props.title}</strong>
      <small>{props.description}</small>
    </button>
  );
}

export default IdentityCard;
