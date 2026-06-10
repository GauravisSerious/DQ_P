import { useNavigate } from "react-router-dom";
import Panel from "../../components/Panel";
import Button from "../../components/Button";
import { useAudit } from "../../context/AuditContext";

export default function MsldWizardPage() {
  const navigate = useNavigate();
  const { runMsldScan, msldLoading } = useAudit();

  const handleStart = async () => {
    navigate("/app/msld/running");
    try {
      await runMsldScan();
      navigate("/app/msld/results");
    } catch (err) {
      console.error(err);
      navigate("/app/msld");
    }
  };

  return (
    <main className="workspace-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 120px)" }}>
      <Panel className="msld-start-panel" style={{ maxWidth: "800px", width: "100%", padding: "48px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "12px", fontFamily: "var(--font-head)", fontWeight: 800 }}>
          Media Spend Leak Detector
        </h1>
        <p className="helper-copy" style={{ fontSize: "1.05rem", color: "var(--text-2)", marginBottom: "32px", maxWidth: "600px" }}>
          Identify wasteful ad spend and optimize campaigns with automated tracking integrity checks.
        </p>

        <div className="capabilities-box" style={{
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "28px 32px",
          backgroundColor: "var(--panel)",
          marginBottom: "32px",
          boxShadow: "var(--shadow)"
        }}>
          <ul className="capabilities-list" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              "Campaign Monitoring",
              "Conversion Leakage Detection",
              "Tracking Issue Identification",
              "Attribution Validation",
              "Marketing Performance Insights"
            ].map((text) => (
              <li key={text} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "1rem", fontWeight: "600", color: "var(--text-1)" }}>
                <span className="check-icon" style={{
                  color: "#1e8e3e",
                  fontSize: "1.2rem",
                  fontWeight: "700"
                }}>✓</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          onClick={handleStart}
          disabled={msldLoading}
          style={{
            padding: "14px 28px",
            fontSize: "1rem",
            fontWeight: "700",
            backgroundColor: "var(--blue)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "var(--shadow-md)"
          }}
        >
          {msldLoading ? "Initializing..." : "Start Monitoring"}
        </Button>
      </Panel>
    </main>
  );
}
