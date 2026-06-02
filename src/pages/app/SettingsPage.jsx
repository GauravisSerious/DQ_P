import Panel from "../../components/Panel";

function SettingsPage() {
  return (
    <main className="workspace-page">
      <Panel>
        <h2>Settings &amp; configuration</h2>
        <p className="helper-copy">Workspace-level controls for production integration.</p>
        <div className="settings-grid">
          <article className="settings-card">
            <div className="settings-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="settings-icon">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3>Data connectors</h3>
              <p>Manage additional BigQuery projects, service accounts, and region settings.</p>
            </div>
          </article>
          <article className="settings-card">
            <div className="settings-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="settings-icon">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <h3>Alerts</h3>
              <p>Configure Slack/email alerts when score drops below threshold.</p>
            </div>
          </article>
          <article className="settings-card">
            <div className="settings-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="settings-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h3>Team access</h3>
              <p>Invite team members and control viewer/editor/admin permissions.</p>
            </div>
          </article>
        </div>
      </Panel>
    </main>
  );
}

export default SettingsPage;
