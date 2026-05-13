import { Link } from "react-router-dom";
import { Topbar } from "../components/Shared.jsx";

export default function ExecutiveReportPage({ portfolio }) {
  return (
    <>
      <Topbar title="Executive Impact Report" subtitle="Leadership-ready summary of campaign performance, impact, trust risk, and recommended decisions." />
      <section className="panel executive-report">
        <p className="eyebrow">Portfolio Decision Brief</p>
        <h2>EcoSignal recommends focusing on claim proof, budget efficiency, and evidence-backed public messaging.</h2>
        <p>
          Across {portfolio.metrics.activeCampaigns} active sustainability campaigns, average trust readiness is {portfolio.metrics.averageTrustReadiness}/100 and average impact is {portfolio.metrics.averageImpact}/100.
          There are {portfolio.metrics.claimsNeedingEvidence} claims that require stronger evidence before broader public use.
        </p>
        <div className="report-grid">
          <div><span>Total CO2 Avoided</span><strong>{portfolio.metrics.totalCo2Avoided.toLocaleString()} kg</strong></div>
          <div><span>Plastic Avoided</span><strong>{portfolio.metrics.totalPlasticAvoided.toLocaleString()} kg</strong></div>
          <div><span>Total Spend</span><strong>${portfolio.metrics.totalSpend.toLocaleString()}</strong></div>
          <div><span>High Trust Risk</span><strong>{portfolio.metrics.highTrustRisk}</strong></div>
        </div>
      </section>
      <section className="campaign-grid">
        {portfolio.campaigns.map((campaign) => (
          <article className="campaign-card" key={campaign.id}>
            <p className="eyebrow">{campaign.analytics.decision}</p>
            <h3>{campaign.name}</h3>
            <p>{campaign.analytics.recommendation}</p>
            <Link className="primary-link full" to={`/campaigns/${campaign.id}`}>Open Campaign</Link>
          </article>
        ))}
      </section>
    </>
  );
}