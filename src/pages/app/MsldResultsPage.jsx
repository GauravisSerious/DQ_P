import { useState, useMemo } from "react";
import EmptyState from "../../components/EmptyState";
import Panel from "../../components/Panel";
import { useAudit } from "../../context/AuditContext";

const TABS = [
  { id: "Summary", label: "Summary" },
  { id: "Ecommerce data", label: "Ecommerce data" },
  { id: "Custom events", label: "Custom events" },
  { id: "GA4 vs CRM", label: "GA4 vs CRM" },
  { id: "PII compliance", label: "PII compliance" },
  { id: "Tag directory", label: "Tag directory" },
  { id: "Spend impact", label: "Spend impact", badge: "NEW" }
];

export default function MsldResultsPage() {
  const { msldResults, msldActiveTab, setMsldActiveTab } = useAudit();
  
  // Search and filter states
  const [filterText, setFilterText] = useState("");
  const [customEventsFilter, setCustomEventsFilter] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("All channels");
  const [piiSearch, setPiiSearch] = useState("");
  const [tagSubTab, setTagSubTab] = useState("ga4");

  // Filtering logic
  const filteredEvents = useMemo(() => {
    if (!msldResults || !msldResults.ecommerce || !msldResults.ecommerce.events) return [];
    return msldResults.ecommerce.events.filter((e) =>
      e.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [msldResults, filterText]);

  const filteredCustomEvents = useMemo(() => {
    if (!msldResults || !msldResults.customEvents || !msldResults.customEvents.events) return [];
    return msldResults.customEvents.events.filter((e) =>
      e.name.toLowerCase().includes(customEventsFilter.toLowerCase())
    );
  }, [msldResults, customEventsFilter]);

  const filteredDiscrepancies = useMemo(() => {
    if (!msldResults || !msldResults.ga4VsCrm || !msldResults.ga4VsCrm.discrepancies) return [];
    if (selectedChannel === "All channels") return msldResults.ga4VsCrm.discrepancies;
    return msldResults.ga4VsCrm.discrepancies.filter((d) =>
      d.channel.toLowerCase() === selectedChannel.toLowerCase()
    );
  }, [msldResults, selectedChannel]);

  const filteredPiiPages = useMemo(() => {
    if (!msldResults || !msldResults.piiCompliance || !msldResults.piiCompliance.topPages) return [];
    return msldResults.piiCompliance.topPages.filter((p) =>
      p.url.toLowerCase().includes(piiSearch.toLowerCase()) ||
      p.piiType.toLowerCase().includes(piiSearch.toLowerCase())
    );
  }, [msldResults, piiSearch]);

  if (!msldResults) {
    return (
      <main className="workspace-page">
        <Panel>
          <EmptyState subtitle="No spend leak reports available. Run a scan first." />
        </Panel>
      </main>
    );
  }

  return (
    <main className="workspace-page" style={{ paddingTop: "12px" }}>
      {/* Tabs Menu */}
      <nav className="msld-v2-tabs-bar" aria-label="Sub-module tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`msld-v2-tab-button ${msldActiveTab === tab.id ? "active" : ""}`}
            onClick={() => setMsldActiveTab(tab.id)}
            aria-current={msldActiveTab === tab.id ? "page" : undefined}
          >
            {tab.label}
            {tab.badge && <span className="msld-tab-new-badge">{tab.badge}</span>}
          </button>
        ))}
      </nav>

      {/* ===== SUMMARY TAB ===== */}
      {msldActiveTab === "Summary" && (
        <>
          {/* Orange Alert Banner */}
          <div className="msld-v2-alert-banner">
            <span className="msld-v2-alert-dot" />
            <span>{msldResults.summary.banner}</span>
          </div>

          {/* 4 KPI Cards */}
          <div className="msld-v2-kpi-grid">
            {msldResults.summary.kpis.map((kpi) => (
              <div key={kpi.id} className="msld-v2-kpi-card">
                <div className="msld-v2-kpi-title">
                  <span>{kpi.title}</span>
                  {kpi.badge && <span className="kpi-badge">{kpi.badge}</span>}
                </div>
                <div>
                  <div className="msld-v2-kpi-val" style={{
                    color: kpi.tag === "critical" ? "var(--red)" : kpi.tag === "warning" ? "var(--amber)" : "var(--text-1)"
                  }}>
                    {kpi.val}<span>{kpi.unit}</span>
                  </div>
                  <div className="msld-v2-kpi-subtitle">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Module Scores + Active Anomalies & Channel Quality */}
          <div className="msld-v2-grid-layout">
            {/* Left Card: Module Scores */}
            <div className="msld-v2-panel-card">
              <h3>
                <span>MODULE SCORES</span>
              </h3>
              <div className="msld-v2-score-list">
                {msldResults.summary.moduleScores.map((ms) => (
                  <div key={ms.name} className="msld-v2-score-row">
                    <div className="msld-v2-score-label">
                      <span>{ms.name}</span>
                      {ms.badge && <span className="msld-tab-new-badge" style={{ margin: 0, fontSize: "0.6rem" }}>{ms.badge}</span>}
                    </div>
                    <div className="msld-v2-score-track">
                      <div 
                        className={`msld-v2-score-fill ${ms.color}`} 
                        style={{ width: `${(ms.score / ms.max) * 100}%` }}
                      />
                    </div>
                    <div className="msld-v2-score-number">{ms.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Active Anomalies & Channel Quality */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Active Anomalies */}
              <div className="msld-v2-panel-card">
                <h3>
                  <span>ACTIVE ANOMALIES</span>
                  <span className="title-badge">NEW</span>
                </h3>
                <div className="msld-v2-anomalies-list">
                  {msldResults.summary.anomalies.map((anom, idx) => (
                    <div key={idx} className="msld-v2-anomaly-item">
                      <div className="msld-v2-anomaly-text">
                        <span className={`msld-v2-anomaly-dot ${anom.color}`} />
                        <span>{anom.text}</span>
                      </div>
                      <span className={`msld-v2-anomaly-tag ${anom.color}`}>{anom.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Channel Quality */}
              <div className="msld-v2-panel-card">
                <h3>
                  <span>CHANNEL QUALITY</span>
                  <span className="title-badge">NEW</span>
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table className="msld-v2-table">
                    <thead>
                      <tr>
                        <th>Channel</th>
                        <th>UTM Cov.</th>
                        <th>Conv. Cap.</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {msldResults.summary.channelQuality.map((ch, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: "600", color: "var(--text-1)" }}>{ch.channel}</td>
                          <td style={{ color: ch.badgeClass === "critical" ? "var(--red)" : "var(--text-2)" }}>{ch.utm}</td>
                          <td>{ch.conv}</td>
                          <td>
                            <span className={`msld-v2-badge ${ch.badgeClass}`}>{ch.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== ECOMMERCE DATA TAB ===== */}
      {msldActiveTab === "Ecommerce data" && (
        <>
          {/* 3 KPI Cards */}
          <div className="msld-v2-kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {msldResults.ecommerce.kpis.map((kpi) => (
              <div key={kpi.id} className="msld-v2-kpi-card">
                <div className="msld-v2-kpi-title" style={{ color: "var(--blue)" }}>
                  <span>{kpi.title}</span>
                  {kpi.badge && <span className="kpi-badge" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>{kpi.badge}</span>}
                </div>
                <div>
                  <div className="msld-v2-kpi-val" style={{ color: "var(--blue)" }}>
                    {kpi.val}<span>{kpi.unit}</span>
                  </div>
                  <div className="msld-v2-kpi-subtitle">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Scores Table Card */}
          <Panel className="msld-v2-panel-card" style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "var(--blue)" }}>
                EVENT SCORES — ECOMMERCE DICTIONARY
              </h3>
              
              {/* Search Toolbar */}
              <div className="msld-v2-search-input-wrap">
                <svg className="msld-v2-search-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Filter events..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="msld-v2-table" style={{ width: "100%", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Score</th>
                    <th>Wrong Count</th>
                    <th>Event Count</th>
                    <th>% Wrong</th>
                    <th style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>In Paid Sessions</span>
                      <span className="msld-tab-new-badge" style={{ fontSize: "0.58rem" }}>NEW</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((evt, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: "600", color: "var(--text-1)" }}>
                          {evt.name}
                        </td>
                        <td>
                          <span className={`msld-v2-event-badge ${evt.scoreClass}`}>
                            {evt.score}
                          </span>
                        </td>
                        <td style={{ color: evt.wrongCount !== "0" ? "var(--text-1)" : "var(--text-3)" }}>
                          {evt.wrongCount}
                        </td>
                        <td>{evt.eventCount}</td>
                        <td style={{ color: evt.pctWrong === "100%" ? "var(--red)" : "var(--text-3)", fontWeight: evt.pctWrong === "100%" ? "700" : "normal" }}>
                          {evt.pctWrong}
                        </td>
                        <td style={{ color: evt.inPaid === "100%" ? "var(--text-1)" : "var(--text-3)" }}>
                          {evt.inPaid}
                          {evt.alert && <span className="msld-v2-alert-marker">!</span>}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "24px" }}>
                        <EmptyState subtitle="No events match your filter query." />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Spend Impact Cards Section */}
          <div className="msld-v2-impact-container">
            <h4 style={{ margin: 0, fontSize: "0.92rem", fontWeight: "700", color: "var(--blue)", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>{msldResults.ecommerce.spendImpact.title}</span>
              <span className="msld-tab-new-badge" style={{ backgroundColor: "var(--blue)", color: "#fff" }}>
                {msldResults.ecommerce.spendImpact.badge}
              </span>
            </h4>

            <div className="msld-v2-impact-boxes">
              {msldResults.ecommerce.spendImpact.boxes.map((box, idx) => (
                <div key={idx} className="msld-v2-impact-box">
                  <div className="msld-v2-impact-box-title">{box.title}</div>
                  <div className="msld-v2-impact-box-val">{box.val}</div>
                  <div className="msld-v2-impact-box-subtitle">{box.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ===== CUSTOM EVENTS TAB ===== */}
      {msldActiveTab === "Custom events" && (
        <>
          {/* 3 KPI Cards */}
          <div className="msld-v2-kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {msldResults.customEvents.kpis.map((kpi) => (
              <div key={kpi.id} className="msld-v2-kpi-card">
                <div className="msld-v2-kpi-title" style={{ color: "var(--blue)" }}>
                  <span>{kpi.title}</span>
                  {kpi.badge && <span className="kpi-badge" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>{kpi.badge}</span>}
                </div>
                <div>
                  <div className="msld-v2-kpi-val" style={{ color: kpi.tag === "critical" ? "var(--red)" : kpi.tag === "warning" ? "var(--amber)" : "var(--blue)" }}>
                    {kpi.val}<span>{kpi.unit}</span>
                  </div>
                  <div className="msld-v2-kpi-subtitle">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Scores Panel */}
          <Panel className="msld-v2-panel-card" style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "var(--blue)" }}>
                EVENT SCORES — CUSTOM DICTIONARY
              </h3>
              
              {/* Search Toolbar */}
              <div className="msld-v2-search-input-wrap">
                <svg className="msld-v2-search-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Filter events..."
                  value={customEventsFilter}
                  onChange={(e) => setCustomEventsFilter(e.target.value)}
                />
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="msld-v2-table" style={{ width: "100%", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Score</th>
                    <th>Wrong Count</th>
                    <th>Event Count</th>
                    <th>% Wrong</th>
                    <th style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>In Paid Sessions</span>
                      <span className="msld-tab-new-badge" style={{ fontSize: "0.58rem" }}>NEW</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomEvents.length > 0 ? (
                    filteredCustomEvents.map((evt, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: "600", color: "var(--text-1)" }}>
                          {evt.name}
                        </td>
                        <td>
                          {evt.score !== "—" ? (
                            <span className={`msld-v2-event-badge ${evt.scoreClass}`}>
                              {evt.score}
                            </span>
                          ) : (
                            <span style={{ color: "var(--text-3)", paddingLeft: "8px" }}>—</span>
                          )}
                        </td>
                        <td style={{ color: evt.wrongCount !== "0" ? "var(--text-1)" : "var(--text-3)" }}>
                          {evt.wrongCount}
                        </td>
                        <td>{evt.eventCount}</td>
                        <td style={{ 
                          color: (evt.pctWrong.includes("22") || evt.pctWrong.includes("68")) ? "var(--red)" : "var(--text-2)",
                          fontWeight: (evt.pctWrong.includes("22") || evt.pctWrong.includes("68")) ? "700" : "normal"
                        }}>
                          {evt.pctWrong}
                        </td>
                        <td style={{ 
                          color: (evt.inPaid.includes("22") || evt.inPaid.includes("71")) ? "var(--red)" : "var(--text-2)",
                          fontWeight: (evt.inPaid.includes("22") || evt.inPaid.includes("71")) ? "700" : "normal"
                        }}>
                          {evt.inPaid}
                          {evt.alert && <span className="msld-v2-alert-marker">!</span>}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "24px" }}>
                        <EmptyState subtitle="No custom events match your filter query." />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}

      {/* ===== GA4 VS CRM TAB ===== */}
      {msldActiveTab === "GA4 vs CRM" && (
        <>
          {/* 4 KPI Cards */}
          <div className="msld-v2-kpi-grid">
            {msldResults.ga4VsCrm.kpis.map((kpi) => (
              <div key={kpi.id} className="msld-v2-kpi-card">
                <div className="msld-v2-kpi-title" style={{ color: "var(--blue)" }}>
                  <span>{kpi.title}</span>
                  {kpi.badge && <span className="kpi-badge" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>{kpi.badge}</span>}
                </div>
                <div>
                  <div className="msld-v2-kpi-val" style={{ color: kpi.tag === "critical" ? "var(--red)" : kpi.tag === "warning" ? "var(--amber)" : "var(--blue)" }}>
                    {kpi.val}<span>{kpi.unit}</span>
                  </div>
                  <div className="msld-v2-kpi-subtitle">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Transaction Discrepancies Panel */}
          <Panel className="msld-v2-panel-card" style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "var(--blue)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>TRANSACTION-LEVEL DISCREPANCIES</span>
                <span className="msld-tab-new-badge" style={{ background: "var(--blue)", color: "#fff", margin: 0, fontSize: "0.6rem" }}>NEW — CHANNEL ATTRIBUTED</span>
              </h3>
              
              {/* Channel Dropdown Filter */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: "700", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Filter by Channel:</span>
                <select
                  className="msld-v2-select"
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid var(--border)",
                    background: "var(--panel)",
                    color: "var(--text-1)",
                    fontSize: "0.85rem",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="All channels">All channels</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Meta paid">Meta paid</option>
                  <option value="Direct">Direct</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="msld-v2-table" style={{ width: "100%", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>GA4</th>
                    <th>Invoice Value</th>
                    <th style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>Channel</span>
                      <span className="msld-tab-new-badge" style={{ fontSize: "0.58rem" }}>NEW</span>
                    </th>
                    <th>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        Likely Cause <span className="msld-tab-new-badge" style={{ fontSize: "0.58rem" }}>NEW</span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDiscrepancies.length > 0 ? (
                    filteredDiscrepancies.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontFamily: "monospace", color: "var(--text-2)", fontSize: "0.85rem" }}>
                          {item.id}
                        </td>
                        <td>
                          <span className={`msld-v2-event-badge ${item.statusClass}`} style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "4px" }}>
                            {item.ga4}
                          </span>
                        </td>
                        <td style={{ fontWeight: "700", color: "var(--blue)" }}>
                          {item.value}
                        </td>
                        <td style={{ color: "var(--text-1)", fontWeight: "500" }}>{item.channel}</td>
                        <td style={{ color: item.cause !== "—" ? "var(--text-1)" : "var(--text-3)" }}>
                          {item.cause}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", padding: "24px" }}>
                        <EmptyState subtitle="No transaction records match the channel filter." />
                      </td>
                    </tr>
                  )}
                  {/* Grand Total Row */}
                  <tr style={{ background: "var(--table-header)", fontWeight: "700" }}>
                    <td style={{ color: "var(--text-1)", fontWeight: "700" }}>
                      {msldResults.ga4VsCrm.grandTotal.id}
                    </td>
                    <td style={{ color: "var(--blue)" }}>
                      {msldResults.ga4VsCrm.grandTotal.ga4}
                    </td>
                    <td style={{ color: "var(--blue)", fontWeight: "800" }}>
                      {msldResults.ga4VsCrm.grandTotal.value}
                    </td>
                    <td style={{ color: "var(--text-3)" }}>—</td>
                    <td style={{ color: "var(--text-3)" }}>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </>
      )}

      {/* ===== PII COMPLIANCE TAB ===== */}
      {msldActiveTab === "PII compliance" && (
        <>
          {/* 3 KPI Cards */}
          <div className="msld-v2-kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {msldResults.piiCompliance.kpis.map((kpi) => (
              <div key={kpi.id} className="msld-v2-kpi-card">
                <div className="msld-v2-kpi-title" style={{ color: "var(--blue)" }}>
                  <span>{kpi.title}</span>
                  {kpi.badge && <span className="kpi-badge" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>{kpi.badge}</span>}
                </div>
                <div>
                  <div className="msld-v2-kpi-val" style={{ color: kpi.tag === "critical" ? "var(--red)" : kpi.tag === "warning" ? "var(--amber)" : "var(--blue)" }}>
                    {kpi.val}<span>{kpi.unit}</span>
                  </div>
                  <div className="msld-v2-kpi-subtitle">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 2-column layout */}
          <div className="msld-v2-grid-layout" style={{ gridTemplateColumns: "1.1fr 1.3fr" }}>
            {/* Left Card: TYPES OF PII FOUND IN URLS */}
            <div className="msld-v2-panel-card">
              <h3 style={{ color: "var(--blue)" }}>
                TYPES OF PII FOUND IN URLS
              </h3>
              <div className="msld-v2-score-list" style={{ marginTop: "20px" }}>
                {msldResults.piiCompliance.types.map((type, idx) => (
                  <div key={idx} className="msld-v2-score-row" style={{ alignItems: "center" }}>
                    <div className="msld-v2-score-label" style={{ width: "130px", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-2)" }}>
                      {type.name}
                    </div>
                    <div className="msld-v2-score-track" style={{ flex: 1, height: "8px", background: "var(--border)", borderRadius: "99px" }}>
                      <div 
                        className="msld-v2-pii-bar-fill" 
                        style={{ 
                          width: `${type.pct}%`, 
                          height: "100%", 
                          borderRadius: "99px",
                          background: type.barClass === "bg-red" ? "var(--red)" : type.barClass === "bg-amber" ? "var(--amber)" : "var(--blue)"
                        }}
                      />
                    </div>
                    <div style={{ width: "60px", textAlign: "right", fontSize: "0.85rem", fontWeight: "700", color: "var(--text-3)" }}>
                      {type.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: TOP PAGES WITH PII */}
            <div className="msld-v2-panel-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <h3 style={{ margin: 0, color: "var(--blue)" }}>
                  TOP PAGES WITH PII
                </h3>
                
                {/* Search field */}
                <div className="msld-v2-search-input-wrap">
                  <svg className="msld-v2-search-icon-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    type="text"
                    placeholder="Search URLs/types..."
                    value={piiSearch}
                    onChange={(e) => setPiiSearch(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table className="msld-v2-table">
                  <thead>
                    <tr>
                      <th>URL (Truncated)</th>
                      <th>PII Type</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPiiPages.length > 0 ? (
                      filteredPiiPages.map((page, idx) => (
                        <tr key={idx}>
                          <td style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--text-2)", wordBreak: "break-all" }}>
                            {page.url}
                          </td>
                          <td>
                            <span className={`msld-v2-event-badge ${page.badgeClass}`} style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "4px" }}>
                              {page.piiType}
                            </span>
                          </td>
                          <td style={{ fontWeight: "700", color: "var(--text-1)" }}>
                            {page.count}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center", padding: "24px" }}>
                          <EmptyState subtitle="No URL records match search query." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== TAG DIRECTORY TAB ===== */}
      {msldActiveTab === "Tag directory" && (
        <>
          {/* 4 KPI Cards */}
          <div className="msld-v2-kpi-grid">
            {msldResults.tagDirectory.kpis.map((kpi) => (
              <div key={kpi.id} className="msld-v2-kpi-card">
                <div className="msld-v2-kpi-title" style={{ color: "var(--blue)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {kpi.title}
                    {kpi.alert && <span className="msld-v2-alert-marker" style={{ margin: 0 }}>!</span>}
                  </span>
                  {kpi.badge && <span className="kpi-badge" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>{kpi.badge}</span>}
                </div>
                <div>
                  <div className="msld-v2-kpi-val" style={{ color: kpi.tag === "critical" ? "var(--red)" : kpi.tag === "warning" ? "var(--amber)" : "var(--blue)" }}>
                    {kpi.val}<span>{kpi.unit}</span>
                  </div>
                  <div className="msld-v2-kpi-subtitle">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sub tabs selector menu inside Tag directory */}
          <div className="msld-tag-sub-tabs-bar" style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
            {msldResults.tagDirectory.subTabs.map((sub) => {
              if (sub.badge) {
                return (
                  <button
                    key={sub.id}
                    className={`msld-tag-sub-tab-btn triggers-btn ${tagSubTab === sub.id ? "active" : ""}`}
                    onClick={() => setTagSubTab(sub.id)}
                    style={{
                      background: tagSubTab === sub.id ? "var(--red-pale)" : "transparent",
                      color: "var(--red)",
                      border: "1px solid var(--red-mid)",
                      padding: "6px 14px",
                      borderRadius: "99px",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <span>{sub.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={sub.id}
                  className={`msld-tag-sub-tab-btn ${tagSubTab === sub.id ? "active" : ""}`}
                  onClick={() => setTagSubTab(sub.id)}
                  style={{
                    background: tagSubTab === sub.id ? "var(--blue-pale)" : "transparent",
                    color: tagSubTab === sub.id ? "var(--blue)" : "var(--text-3)",
                    border: tagSubTab === sub.id ? "1px solid var(--blue-mid)" : "1px solid var(--border)",
                    padding: "6px 14px",
                    borderRadius: "99px",
                    fontSize: "0.78rem",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>

          {/* GA4 TAG INFO Table Card */}
          <Panel className="msld-v2-panel-card" style={{ marginBottom: "24px" }}>
            {tagSubTab === "ga4" ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "700", color: "var(--blue)" }}>
                    GA4 TAG INFO
                    <span style={{ fontSize: "0.82rem", fontWeight: "normal", color: "var(--text-3)", marginLeft: "10px" }}>
                      45 active · 0 unused
                    </span>
                  </h3>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table className="msld-v2-table" style={{ width: "100%", borderSpacing: 0 }}>
                    <thead>
                      <tr>
                        <th>Tag Name</th>
                        <th>Type</th>
                        <th>Event Name</th>
                        <th>Trigger Type</th>
                        <th>Trigger</th>
                        <th>Paused</th>
                        <th>Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {msldResults.tagDirectory.tags.map((tag, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: "600", color: "var(--text-1)" }}>
                            {tag.name}
                          </td>
                          <td>
                            <span className={`msld-v2-event-badge ${tag.typeClass}`} style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                              {tag.type}
                            </span>
                          </td>
                          <td style={{ color: tag.event !== "—" ? "var(--text-1)" : "var(--text-3)" }}>
                            {tag.event}
                          </td>
                          <td style={{ color: "var(--text-3)" }}>
                            {tag.triggerType}
                          </td>
                          <td style={{ fontFamily: "monospace", color: "var(--text-3)", fontSize: "0.8rem" }}>
                            {tag.trigger}
                          </td>
                          <td>
                            <span className="msld-v2-event-badge badge-green" style={{ fontSize: "0.7rem", padding: "2px 8px", borderRadius: "4px" }}>
                              {tag.paused}
                            </span>
                          </td>
                          <td style={{ color: "var(--text-3)", fontSize: "0.82rem" }}>
                            {tag.lastUpdated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: "16px", fontSize: "0.8rem", color: "var(--text-3)", fontStyle: "italic" }}>
                  {msldResults.tagDirectory.footer}
                </div>
              </>
            ) : (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <EmptyState subtitle={`Detailed analytics for tag sub-tab "${tagSubTab.toUpperCase()}" will be compiled dynamically in production.`} />
              </div>
            )}
          </Panel>
        </>
      )}

      {/* ===== SPEND IMPACT TAB ===== */}
      {msldActiveTab === "Spend impact" && (
        <>
          {/* 4 KPI Cards */}
          <div className="msld-v2-kpi-grid">
            {msldResults.spendImpact.kpis.map((kpi) => (
              <div key={kpi.id} className="msld-v2-kpi-card">
                <div className="msld-v2-kpi-title" style={{ color: "var(--blue)" }}>
                  <span>{kpi.title}</span>
                  {kpi.badge && <span className="kpi-badge" style={{ background: "var(--blue-pale)", color: "var(--blue)" }}>{kpi.badge}</span>}
                </div>
                <div>
                  <div className="msld-v2-kpi-val" style={{ color: kpi.tag === "critical" ? "var(--red)" : kpi.tag === "warning" ? "var(--amber)" : "var(--blue)" }}>
                    {kpi.val}<span>{kpi.unit}</span>
                  </div>
                  <div className="msld-v2-kpi-subtitle">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Campaign Table Panel */}
          <Panel className="msld-v2-panel-card" style={{ marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1.1rem", fontWeight: "700", color: "var(--blue)" }}>
              ROAS UNDERREPORT BY CAMPAIGN
            </h3>

            <div style={{ overflowX: "auto" }}>
              <table className="msld-v2-table" style={{ width: "100%", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Spend</th>
                    <th>Reported ROAS</th>
                    <th>True ROAS (Est.)</th>
                    <th>Underreport</th>
                    <th>Tracking Score</th>
                  </tr>
                </thead>
                <tbody>
                  {msldResults.spendImpact.campaigns.map((camp, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: "600", color: "var(--text-1)" }}>
                        {camp.name}
                      </td>
                      <td style={{ fontWeight: "700", color: "var(--text-1)" }}>
                        {camp.spend}
                      </td>
                      <td style={{ color: "var(--text-2)" }}>
                        {camp.reportedRoas}
                      </td>
                      <td style={{ fontWeight: "600", color: "var(--blue)" }}>
                        {camp.trueRoas}
                      </td>
                      <td>
                        <span className="msld-v2-event-badge badge-red" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                          {camp.underreport}
                        </span>
                      </td>
                      <td>
                        <span className={`msld-v2-event-badge ${camp.scoreClass}`} style={{ fontSize: "0.78rem", padding: "2px 10px", borderRadius: "99px" }}>
                          {camp.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* 2-column layout for Completeness and Trend Chart */}
          <div className="msld-v2-grid-layout" style={{ gridTemplateColumns: "1.1fr 1.3fr", marginBottom: "24px" }}>
            {/* Left Card: BIDDING SIGNAL COMPLETENESS BY CHANNEL */}
            <div className="msld-v2-panel-card">
              <h3 style={{ color: "var(--blue)", marginBottom: "24px" }}>
                BIDDING SIGNAL COMPLETENESS BY CHANNEL
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {msldResults.spendImpact.channels.map((chan, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", color: "var(--text-2)" }}>
                      <span>{chan.name}</span>
                      <span style={{ color: chan.color, fontWeight: "700" }}>{chan.pct}%</span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "var(--border)", borderRadius: "99px", overflow: "hidden" }}>
                      <div 
                        style={{ 
                          width: `${chan.pct}%`, 
                          height: "100%", 
                          background: chan.color,
                          borderRadius: "99px"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: REVENUE INVISIBLE TO GA4 — 30-DAY TREND */}
            <div className="msld-v2-panel-card">
              <h3 style={{ color: "var(--blue)", marginBottom: "16px" }}>
                REVENUE INVISIBLE TO GA4 — 30-DAY TREND
              </h3>

              {/* SVG Trend Bar Chart */}
              <div style={{ width: "100%", height: "130px", display: "flex", alignItems: "flex-end", gap: "10px", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                {msldResults.spendImpact.trend.bars.map((bar, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      flex: 1, 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center", 
                      gap: "6px"
                    }}
                  >
                    <div 
                      className="trend-bar-hover-target"
                      style={{ 
                        width: "100%", 
                        height: `${(bar.val / 70) * 80}px`, 
                        background: bar.type === "actual" ? "var(--amber)" : "var(--blue-mid)",
                        borderRadius: "3px 3px 0 0",
                        transition: "opacity 0.2s"
                      }}
                      title={`${bar.type === "actual" ? "Actual" : "Forecast"}: Day ${idx * 3 + 1}-${idx * 3 + 3}`}
                    />
                  </div>
                ))}
              </div>

              {/* Legend Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-3)" }}>
                    <span style={{ width: "10px", height: "10px", background: "var(--amber)", borderRadius: "2px" }} />
                    <span>Actual</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: "600", color: "var(--text-3)" }}>
                    <span style={{ width: "10px", height: "10px", background: "var(--blue-mid)", borderRadius: "2px" }} />
                    <span>Forecast</span>
                  </div>
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--text-1)" }}>
                  <span style={{ color: "var(--amber)" }}>{msldResults.spendImpact.trend.actual}</span>
                  <span style={{ color: "var(--text-3)", margin: "0 6px" }}>·</span>
                  <span style={{ color: "var(--blue)" }}>{msldResults.spendImpact.trend.projected}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
