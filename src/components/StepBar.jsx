import "./StepBar.css";

const defaultLabels = ["Goals", "Audit type", "Identity", "Connect"];

function StepBar({ current = 1, total = 4, labels = defaultLabels }) {
  const percent = Math.round(((current - 1) / (total - 1)) * 100);
  return (
    <div className="stepbar" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => {
        const step = index + 1;
        const state = step < current ? "done" : step === current ? "active" : "";
        return (
          <div key={step} className={`stepbar-item ${state}`} aria-current={step === current ? "step" : undefined}>
            <span className={`stepbar-dot ${state}`} aria-hidden="true">
              {step < current ? "✓" : step}
            </span>
            <small>{labels[index] || `Step ${step}`}</small>
          </div>
        );
      })}
    </div>
  );
}

export default StepBar;
