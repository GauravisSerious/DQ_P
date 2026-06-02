import "./ScoreGauge.css";

function getScoreColor(score) {
  if (score >= 80) return { start: "#2f9e44", end: "#40c057" };
  if (score >= 60) return { start: "#3b5bdb", end: "#2f9e44" };
  if (score >= 40) return { start: "#f59f00", end: "#3b5bdb" };
  return { start: "#e03131", end: "#f59f00" };
}

function getScoreLabel(score) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs Work";
  return "Critical";
}

function ScoreGauge({ score = 0 }) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const colors = getScoreColor(score);
  const gradientId = `scoreGradient-${score}`;

  return (
    <div className="gauge-wrap" role="img" aria-label={`Confidence score: ${score} out of 100 — ${getScoreLabel(score)}`}>
      <svg className="gauge" viewBox="0 0 150 150">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        </defs>
        <circle className="gauge-bg" cx="75" cy="75" r={radius} />
        <circle className="gauge-fill" cx="75" cy="75" r={radius} style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset, stroke: `url(#${gradientId})` }} />
      </svg>
      <div className="gauge-score">
        <span className="gauge-number">{score}</span>
        <span className="gauge-label">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
}

export default ScoreGauge;
