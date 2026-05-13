import { Topbar } from "../components/Shared.jsx";

export default function BudgetPage({ portfolio }) {
  return (
    <>
      <Topbar title="Budget Reallocation Intelligence" subtitle="Compare spend efficiency with verified impact actions and trust readiness." />
      <section className="panel">
        <div className="stack">
          {portfolio.campaigns.map((campaign) => (
            <article className="budget-card" key={campaign.id}>
              <div><p className="eyebrow">{campaign.department}</p><h2>{campaign.name}</h2><p>{campaign.analytics.recommendation}</p></div>
              <div className="score-strip">
                <div><span>Spend</span><strong>${campaign.spendToDate.toLocaleString()}</strong></div>
                <div><span>Budget Used</span><strong>{campaign.analytics.totals.budgetUsed}%</strong></div>
                <div><span>Best Channel</span><strong>{campaign.analytics.bestChannel}</strong></div>
                <div><span>Weakest Channel</span><strong>{campaign.analytics.weakestChannel}</strong></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}