import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import AuditCard from "../../components/AuditCard";
import Button from "../../components/Button";
import GoalCard from "../../components/GoalCard";
import IdentityCard from "../../components/IdentityCard";
import StepBar from "../../components/StepBar";
import { useAudit } from "../../context/AuditContext";

const STEP_LABELS = {
  complete: ["Goals", "Audit type", "Identity", "Connect"],
  ml:       ["Goals", "Audit type", "Connect"],
  tracking: ["Goals", "Audit type", "Connect"],
};

const goals = [
  { key: "ecommerce", icon: "🛒", title: "Online Store",    subtitle: "Revenue, cart, and product analytics" },
  { key: "leadgen",   icon: "📈", title: "Service & Leads", subtitle: "Pipeline, form, and CRM tracking"     },
  { key: "publisher", icon: "📱", title: "Content & Apps",  subtitle: "Engagement, retention, and monetisation" },
];
const audits = [
  { key: "complete", icon: "🔍", title: "Complete Data Health Check",   description: "Full quality audit across all pillars with confidence scoring" },
  { key: "ml",       icon: "🤖", title: "ML / AI Readiness",            description: "Data readiness for model training and prediction use-cases"   },
  { key: "tracking", icon: "📊", title: "Event & Tracking Integrity",   description: "Tracking setup quality, naming consistency, and conversion fidelity" },
];

/* Dynamic insight copy per step × goal selection */
function insightCopy(step, selectedGoals, selectedAudit) {
  const goalsArr = Array.from(selectedGoals);
  const hasEcom  = goalsArr.includes("ecommerce");
  const hasLead  = goalsArr.includes("leadgen");
  const hasPub   = goalsArr.includes("publisher");

  if (step === 1) {
    if (hasEcom) return "E-commerce mode unlocks revenue integrity checks, cart event validation, and currency consistency diagnostics.";
    if (hasLead) return "Lead-gen mode activates form-submission tracking, CRM sync checks, and pipeline attribution validation.";
    if (hasPub)  return "Publisher mode enables content engagement checks, session quality analysis, and retention signal validation.";
    return "Select at least one goal to tailor your findings and benchmark logic.";
  }
  if (step === 2) return "Audit mode controls the depth of analysis. Complete mode covers all pillars.";
  if (step === 3 && selectedAudit === "complete") return "Identity signals influence attribution trust and confidence scoring.";
  return "We run read-only checks and generate an executive report with priority actions.";
}

export default function WizardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const {
    selectedGoals, toggleGoal,
    selectedAudit, setAudit,
    userIdentity, setIdentity,
    project, dataset, setProject, setDataset,
    runAudit, loading,
  } = useAudit();

  const totalSteps = selectedAudit === "complete" ? 4 : 3;
  const stepLabels = STEP_LABELS[selectedAudit] || STEP_LABELS.complete;

  const canMoveNext = useMemo(() => {
    if (step === 1) return selectedGoals.size > 0;
    if (step === 2) return Boolean(selectedAudit);
    if (step === 3 && selectedAudit === "complete") return Boolean(userIdentity);
    return Boolean(project && dataset);
  }, [step, selectedGoals.size, selectedAudit, userIdentity, project, dataset]);

  const onRun = async () => {
    navigate("/app/running");
    try   { await runAudit(); navigate("/app/results"); }
    catch { navigate("/app/running"); }
  };

  const insight = insightCopy(step, selectedGoals, selectedAudit);

  return (
    <div className="wizard-root">

      {/* ── TOP PROGRESS BAR — full width, sticky ───────────────── */}
      <div className="wizard-topbar">
        <div className="wizard-topbar-inner">
          <div className="wizard-topbar-meta">
            <p className="eyebrow" style={{ marginBottom: 0 }}>Guided setup · Step {step} of {totalSteps}</p>
          </div>
          <StepBar current={step} total={totalSteps} labels={stepLabels} />
        </div>
      </div>

      {/* ── 2-COLUMN BODY ──────────────────────────────────────────── */}
      <div className="wizard-body">

        {/* ── LEFT SIDEBAR (context) ─────────────────────────── */}
        <aside className="wizard-sidebar">
          <div className="wizard-sidebar-inner">
            <h2 className="wizard-sidebar-title">Build your audit in a few focused steps</h2>
            <p className="helper-copy">Each step personalises checks and recommendations for your business.</p>

            <div className="wizard-insight-box">
              <p className="wizard-insight-label">💡 Live insight</p>
              <p className="wizard-insight-text">{insight}</p>
            </div>

            <div className="wizard-sidebar-checklist">
              <p className="wizard-check-title">You will get:</p>
              <ul>
                <li>Executive confidence score</li>
                <li>Severity-coded findings in plain language</li>
                <li>Prioritised actions for business impact</li>
                <li>AI readiness summary &amp; next best moves</li>
              </ul>
              <p className="wizard-eta">⏱ Average completion: under 2 minutes</p>
            </div>
          </div>
        </aside>

        {/* ── RIGHT CONTENT AREA ─────────────────────────────── */}
        <section className="wizard-content">

          {/* Step 1 — Goals */}
          {step === 1 && (
            <>
              <h2>What are your business goals?</h2>
              <p className="helper-copy">Choose one or more. We tailor findings and recommendations to your selection.</p>
              <div className="wizard-goal-list">
                {goals.map((g) => (
                  <GoalCard key={g.key} {...g} selected={selectedGoals.has(g.key)} onClick={() => toggleGoal(g.key)} />
                ))}
              </div>
            </>
          )}

          {/* Step 2 — Audit type */}
          {step === 2 && (
            <>
              <h2>Choose your audit type</h2>
              <p className="helper-copy">Select one mode. This determines the depth of analysis and which pillars are checked.</p>
              <div className="stack" role="radiogroup" aria-label="Audit type">
                {audits.map((a) => (
                  <AuditCard key={a.key} {...a} selected={selectedAudit === a.key} onClick={() => setAudit(a.key)} />
                ))}
              </div>
            </>
          )}

          {/* Step 3 — Identity (complete only) */}
          {step === 3 && selectedAudit === "complete" && (
            <>
              <h2>Do your users typically log in?</h2>
              <p className="helper-copy">Identity coverage impacts attribution trust and user-level analytics quality.</p>
              <div className="grid-3">
                <IdentityCard icon="✅" title="Yes"      description="Most users log in"             selected={userIdentity === "yes"}     onClick={() => setIdentity("yes")} />
                <IdentityCard icon="❌" title="No"       description="Mostly anonymous traffic"       selected={userIdentity === "no"}      onClick={() => setIdentity("no")} />
                <IdentityCard icon="🤷" title="Not sure" description="Need help evaluating this"      selected={userIdentity === "unknown"} onClick={() => setIdentity("unknown")} />
              </div>
            </>
          )}

          {/* Last step — Connect */}
          {step === totalSteps && (
            <>
              <h2>Connect your BigQuery source</h2>
              <p className="helper-copy">Read-only access only. No data is modified or written back to your project.</p>
              <div className="selects">
                <label>
                  Project
                  <select value={project} onChange={(e) => setProject(e.target.value)}>
                    <option value="demo-project">demo-project</option>
                    <option value="northstar-data">northstar-data</option>
                    <option value="growth-labs">growth-labs</option>
                  </select>
                </label>
                <label>
                  Dataset
                  <select value={dataset} onChange={(e) => setDataset(e.target.value)}>
                    <option value="analytics_123">analytics_123</option>
                    <option value="events_prod">events_prod</option>
                    <option value="ga4_export">ga4_export</option>
                  </select>
                </label>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="wizard-actions">
            <Button kind="ghost" disabled={step === 1} onClick={() => setStep((p) => Math.max(1, p - 1))}>
              Back
            </Button>
            {step < totalSteps ? (
              <Button disabled={!canMoveNext} onClick={() => setStep((p) => p + 1)}>
                Continue
              </Button>
            ) : (
              <Button disabled={!canMoveNext || loading} onClick={onRun}>
                {loading ? "Preparing…" : "Run audit"}
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
