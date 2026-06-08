import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import AuditCard from "../../components/AuditCard";
import Button from "../../components/Button";
import GoalCard from "../../components/GoalCard";
import IdentityCard from "../../components/IdentityCard";
import StepBar from "../../components/StepBar";
import { useAudit } from "../../context/AuditContext";

const STEP_LABELS = {
  complete: ["Sign In", "Business Type", "Audit Type", "Connect Data", "Running", "Results"],
};

const goals = [
  { key: "ecommerce", icon: "🛒", title: "Online Store",    subtitle: "Revenue, cart, and product analytics" },
  { key: "leadgen",   icon: "📈", title: "Service & Leads", subtitle: "Pipeline, form, and CRM tracking"     },
  { key: "publisher", icon: "📱", title: "Content & Apps",  subtitle: "Engagement, retention, and monetisation" },
];

const audits = [
  { key: "complete", icon: "🔍", title: "Complete Data Health Check",   description: "Full audit across all assessment pillars including data quality, tracking integrity, governance, compliance, attribution, and AI readiness.", eta: "5–7 min" },
  { key: "ml",       icon: "🤖", title: "AI / ML Readiness",            description: "Evaluate readiness for predictive modelling, audience creation, forecasting, and advanced analytics.", eta: "3 min" },
  { key: "tracking", icon: "📊", title: "Event & Tracking Integrity",   description: "Validate event naming, parameter consistency, conversion tracking, attribution setup, and measurement quality.", eta: "2 min" },
  { key: "governance", icon: "🛡️", title: "Data Governance & Compliance", description: "Review consent implementation, governance standards, privacy considerations, retention practices, and compliance readiness.", eta: "4 min" },
  { key: "marketing", icon: "📈", title: "Marketing Measurement Audit",  description: "Evaluate campaign tagging, attribution quality, conversion path visibility, and marketing reporting readiness.", eta: "3 min" },
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
  return "We run read-only checks and generate an executive report with priority actions.";
}

export default function WizardPage() {
  const navigate = useNavigate();
  // Wizard steps (local): 1 Goals, 2 Audit type, 3 Identity (Complete only), 4 Connect
  const [step, setStep] = useState(1);
  const {
    selectedGoals, toggleGoal,
    selectedAudit, setAudit,
    userIdentity, setIdentity,
    project, dataset, setProject, setDataset,
    table, setTable,
    runAudit, loading,
  } = useAudit();

  // Simulated access verification states
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null); // 'success', 'warning', 'blocked'

  /* The overall flow has 6 steps. The wizard handles steps 2–4 internally.
     Step 1 (Sign In) is already complete. Steps 5–6 (Running, Results) are separate pages. */
  const wizardSteps = selectedAudit === "complete" ? 4 : 3;
  const totalSteps = 6;
  const stepBarCurrent = step + 1; // offset: wizard step 1 = overall step 2
  const stepLabels = STEP_LABELS.complete;

  const canMoveNext = useMemo(() => {
    if (step === 1) return selectedGoals.size > 0;
    if (step === 2) return Boolean(selectedAudit);
    if (step === 3 && selectedAudit === "complete") return Boolean(userIdentity);
    return Boolean(project && dataset && table);
  }, [step, selectedGoals.size, selectedAudit, userIdentity, project, dataset, table]);

  const isLastWizardStep = step === wizardSteps;

  // Run access verification when data source config page loads, or when parameters change
  useEffect(() => {
    if (isLastWizardStep && project && dataset && table) {
      setIsValidating(true);
      setValidationResult(null);
      const timer = setTimeout(() => {
        setIsValidating(false);
        setValidationResult("success");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isLastWizardStep, project, dataset, table]);

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
            <p className="eyebrow" style={{ marginBottom: 0 }}>Guided setup · Step {stepBarCurrent} of {totalSteps}</p>
          </div>
          <StepBar current={stepBarCurrent} total={totalSteps} labels={stepLabels} />
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
              <p className="helper-copy" style={{ marginBottom: "24px" }}>Select one mode. This determines the depth of analysis and which pillars are checked.</p>

              {/* Section 1: Recommended Audit */}
              <div className="recommended-section">
                <button
                  className={`recommended-audit-card ${selectedAudit === "complete" ? "selected" : ""}`}
                  onClick={() => setAudit("complete")}
                  role="radio"
                  aria-checked={selectedAudit === "complete"}
                  aria-label="Complete Data Health Check: Full audit across all assessment pillars including data quality, tracking integrity, governance, compliance, attribution, and AI readiness. Estimated time: 5 to 7 minutes."
                >
                  <div className="recommended-meta-container">
                    <span className="recommended-pill">RECOMMENDED</span>
                    <div className="recommended-eta-box">
                      <span className="recommended-eta-label">⏱ Estimated Time</span>
                      <span className="recommended-eta-value">5–7 minutes</span>
                    </div>
                  </div>
                  <div className="recommended-card-body">
                    <span className="audit-radio" aria-hidden="true" style={{ marginTop: "4px" }}>
                      {selectedAudit === "complete" && <span className="audit-radio-dot" />}
                    </span>
                    <span className="recommended-icon" aria-hidden="true">🔍</span>
                    <div className="recommended-card-text">
                      <h3>Complete Data Health Check</h3>
                      <p>Full audit across all assessment pillars including data quality, tracking integrity, governance, compliance, attribution, and AI readiness.</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Section 2: Specialized Assessments */}
              <div className="specialized-section-header">
                <h3>Specialized Assessments</h3>
                <p className="helper-copy" style={{ margin: "4px 0 16px" }}>Select a focused scope if you only need to audit specific configurations or pillars.</p>
              </div>

              <div className="specialized-grid" role="radiogroup" aria-label="Specialized Assessments">
                {audits
                  .filter((a) => a.key !== "complete")
                  .map((a) => (
                    <AuditCard
                      key={a.key}
                      {...a}
                      selected={selectedAudit === a.key}
                      onClick={() => setAudit(a.key)}
                      className="specialized-card"
                    />
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

          {/* Last wizard step — Connect */}
          {step === wizardSteps && (
            <>
              <h2>Configure Data Source</h2>
              <p className="helper-copy">DQ Pulse never modifies your data. All assessments are performed using read-only metadata and query analysis.</p>
              
              <div className="onboarding-stepper">
                <div className="onboarding-step">
                  <div className="onboarding-step-header">
                    <span className="onboarding-step-badge">1</span>
                    <strong>Select Project</strong>
                  </div>
                  <select value={project} onChange={(e) => setProject(e.target.value)}>
                    <option value="demo-project">demo-project</option>
                    <option value="northstar-data">northstar-data</option>
                    <option value="growth-labs">growth-labs</option>
                  </select>
                </div>

                <div className={`onboarding-step ${!project ? "disabled" : ""}`}>
                  <div className="onboarding-step-header">
                    <span className="onboarding-step-badge">2</span>
                    <strong>Select Dataset</strong>
                  </div>
                  <select value={dataset} onChange={(e) => setDataset(e.target.value)} disabled={!project}>
                    <option value="analytics_294819481">analytics_294819481</option>
                    <option value="events_warehouse_prod">events_warehouse_prod</option>
                    <option value="marketing_attribution_v1">marketing_attribution_v1</option>
                  </select>
                </div>

                <div className={`onboarding-step ${!dataset ? "disabled" : ""}`}>
                  <div className="onboarding-step-header">
                    <span className="onboarding-step-badge">3</span>
                    <strong>Select Table</strong>
                  </div>
                  <select value={table} onChange={(e) => setTable(e.target.value)} disabled={!dataset}>
                    <option value="events_*">events_*</option>
                    <option value="events_20260608">events_20260608</option>
                    <option value="events_intraday_20260608">events_intraday_20260608</option>
                    <option value="analytics_events_v1_0">analytics_events_v1_0</option>
                    <option value="customer_journey_raw">customer_journey_raw</option>
                  </select>
                </div>
              </div>

              {/* Simulated access verification panel */}
              {project && dataset && table && (
                <div className="access-verification-panel">
                  <h4>Access Verification</h4>
                  {isValidating ? (
                    <div className="verification-status checking">
                      <span className="spinner" />
                      <span>Verifying credential permissions and dataset scope...</span>
                    </div>
                  ) : validationResult === "success" ? (
                    <div className="verification-status success">
                      <div className="status-title">
                        <span className="status-icon">✓</span>
                        <strong>SUCCESS - Connection Verified</strong>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

            </>
          )}

          {/* Navigation */}
          <div className="wizard-actions">
            <Button kind="ghost" disabled={step === 1} onClick={() => setStep((p) => Math.max(1, p - 1))}>
              Back
            </Button>
            {!isLastWizardStep ? (
              <Button disabled={!canMoveNext} onClick={() => setStep((p) => p + 1)}>
                Continue
              </Button>
            ) : (
              <Button
                disabled={!canMoveNext || loading || isValidating}
                onClick={onRun}
              >
                {loading ? "Preparing…" : "Validate & Start Audit"}
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
