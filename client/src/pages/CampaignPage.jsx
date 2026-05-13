import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BadgeDollarSign, Leaf, ShieldAlert, Users } from "lucide-react";
import { ClaimStageBadge, MetricCard, ScoreRing, Topbar } from "../components/Shared.jsx";

const API_BASE = "http://localhost:8080";

export default function CampaignPage({ role }) {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/campaigns/${id}`, { headers: { "x-demo-role": role } })
      .then((response) => response.json())
      .then(setCampaign);
  }, [id, role]);

  if (!campaign) return <div className="panel"><h1>Loading campaign...</h1></div>;

  return (
    <>
      <Topbar title={campaign.name} subtitle={campaign.summary} />
      <section className="campaign-detail-hero">
        <div className="panel">
          <p className="eyebrow">Trust Decision</p>
          <h2>{campaign.analytics.decision}</h2>
          <p>{campaign.analytics.recommendation}</p>
          <div className="detail-grid">
            <div><span>Owner</span><strong>{campaign.owner}</strong></div>
            <div><span>Stage</span><strong>{campaign.stage}</strong></div>
            <div><span>Budget Used</span><strong>{campaign.analytics.totals.budgetUsed}%</strong></div>
            <div><span>Evidence Coverage</span><strong>{campaign.impact.evidenceCoverage}%</strong></div>
          </div>
        </div>
        <div className="panel score-panel">
          <ScoreRing value={campaign.analytics.scores.trustReadinessScore} label="Trust" />
          <ScoreRing value={campaign.analytics.scores.impactScore} label="Impact" />
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard icon={Users} label="Reach" value={campaign.analytics.totals.reach.toLocaleString()} note="Across all channels" />
        <MetricCard icon={Leaf} label="CO2 Avoided" value={`${campaign.impact.co2KgAvoided.toLocaleString()} kg`} note="Estimated impact" />
        <MetricCard icon={BadgeDollarSign} label="Budget Remaining" value={`$${campaign.analytics.totals.budgetRemaining.toLocaleString()}`} note="Available to reallocate" />
        <MetricCard icon={ShieldAlert} label="Greenwashing Risk" value={`${campaign.analytics.scores.greenwashingRiskScore}/100`} note="Claim and evidence risk" />
      </section>

      <section className="two-column">
        <div className="panel">
          <div className="section-heading"><div><p className="eyebrow">Channel Performance</p><h2>Impact per dollar</h2></div></div>
          <div className="table-list">
            {campaign.analytics.channels.map((channel) => (
              <div className="table-row" key={channel.name}>
                <div><strong>{channel.name}</strong><span>{channel.engagementRate}% engagement | {channel.conversionRate}% conversion</span></div>
                <strong>{channel.impactPerDollar} actions / $</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="section-heading"><div><p className="eyebrow">Claim Proof Review</p><h2>Messaging readiness</h2></div></div>
          <div className="stack">
            {campaign.claims.map((claim) => (
              <div className="claim-card" key={claim.id}>
                <div className="claim-top"><strong>{claim.id}</strong><ClaimStageBadge stage={claim.stage} /></div>
                <p>{claim.text}</p>
                <span>{claim.evidenceIds.length} evidence item(s) attached | {claim.risk} risk</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}