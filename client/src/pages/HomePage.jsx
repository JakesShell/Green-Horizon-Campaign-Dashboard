import { ArrowUpRight, BadgeCheck, DollarSign, FileWarning, Leaf, ShieldAlert, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard, ScoreRing, SecurityNotice, TrustBadge } from "../components/Shared.jsx";

export default function HomePage({ portfolio }) {
  const strongestCampaign = [...portfolio.campaigns].sort((a, b) => b.analytics.scores.trustReadinessScore - a.analytics.scores.trustReadinessScore)[0];

  return (
    <>
      <section className="hero">
        <div className="hero-main">
          <p className="eyebrow">JSA Enterprise Sustainability Intelligence</p>
          <h1>EcoSignal Impact Assurance</h1>
          <p>Measure campaign performance, prove environmental claims, review evidence, detect greenwashing risk, and generate executive-ready impact decisions.</p>
          <div className="hero-actions">
            <Link className="primary-link" to="/claims">Review Green Claims <ArrowUpRight size={16} /></Link>
            <Link className="ghost-button" to="/executive-report">Executive Impact Report</Link>
          </div>
        </div>
        <div className="hero-aside">
          <ScoreRing value={portfolio.metrics.averageTrustReadiness} label="Trust Readiness" />
          <p>Average public-claim readiness across active sustainability campaigns.</p>
          <SecurityNotice />
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard icon={Leaf} label="Active Campaigns" value={portfolio.metrics.activeCampaigns} note="Tracked sustainability campaigns" />
        <MetricCard icon={ShieldAlert} label="High Trust Risk" value={portfolio.metrics.highTrustRisk} note="Need proof or claim review" />
        <MetricCard icon={BadgeCheck} label="Approved Claims" value={portfolio.metrics.approvedClaims} note="Ready for public use" />
        <MetricCard icon={FileWarning} label="Claims Needing Evidence" value={portfolio.metrics.claimsNeedingEvidence} note="Require ESG/legal attention" />
        <MetricCard icon={TrendingUp} label="Average Impact" value={`${portfolio.metrics.averageImpact}/100`} note="Impact score across campaigns" />
        <MetricCard icon={DollarSign} label="Spend Tracked" value={`$${portfolio.metrics.totalSpend.toLocaleString()}`} note={`of $${portfolio.metrics.totalBudget.toLocaleString()} budget`} />
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Campaign Portfolio</p>
            <h2>Impact, trust, and performance overview</h2>
          </div>
          <span className="subtle-chip">Strongest: {strongestCampaign.name}</span>
        </div>

        <div className="campaign-grid">
          {portfolio.campaigns.map((campaign) => (
            <article className="campaign-card" key={campaign.id}>
              <div className="campaign-card-header">
                <div className="avatar">{campaign.ownerInitials}</div>
                <div><p>{campaign.department}</p><h3>{campaign.name}</h3></div>
                <TrustBadge score={campaign.analytics.scores.trustReadinessScore} />
              </div>
              <p className="campaign-summary">{campaign.summary}</p>
              <div className="score-strip">
                <div><span>Impact</span><strong>{campaign.analytics.scores.impactScore}/100</strong></div>
                <div><span>Trust</span><strong>{campaign.analytics.scores.trustReadinessScore}/100</strong></div>
                <div><span>Risk</span><strong>{campaign.analytics.scores.greenwashingRiskScore}/100</strong></div>
              </div>
              <div className="campaign-meta">
                <div><span>Owner</span><strong>{campaign.owner}</strong></div>
                <div><span>Stage</span><strong>{campaign.stage}</strong></div>
                <div><span>End Date</span><strong>{campaign.endDate}</strong></div>
                <div><span>Decision</span><strong>{campaign.analytics.decision}</strong></div>
              </div>
              <Link className="primary-link full" to={`/campaigns/${campaign.id}`}>Open Campaign Intelligence <ArrowUpRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}