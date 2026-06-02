import EmptyState from "../../components/EmptyState";
import FindingCard from "../../components/FindingCard";
import Panel from "../../components/Panel";
import UseCaseCard from "../../components/UseCaseCard";
import { useAudit } from "../../context/AuditContext";
import { useCases } from "../../data/useCases";

function RecommendationsPage() {
  const { recommendations, selectedGoals } = useAudit();
  const tools = useCases.filter((item) => selectedGoals.has(item.goal));
  return (
    <main className="workspace-page">
      <Panel>
        <h2>Recommendations</h2>
        <p className="helper-copy">Actions prioritized for business impact and effort.</p>
        {!recommendations.length ? <EmptyState subtitle="Run an audit to generate recommendations." /> : null}

        {recommendations.length > 0 && (
          <>
            <h3>Action plan</h3>
            <div className="action-plan-list">
              {recommendations.map((item, idx) => (
                <div className="action-plan-item" key={item}>
                  <span className="action-plan-number">{idx + 1}</span>
                  <div className="action-plan-content">
                    <p>{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tools.length > 0 && (
          <>
            <h3>Recommended tools</h3>
            <div className="stack">{tools.map((item) => <UseCaseCard key={item.id} {...item} />)}</div>
          </>
        )}
      </Panel>
    </main>
  );
}

export default RecommendationsPage;
