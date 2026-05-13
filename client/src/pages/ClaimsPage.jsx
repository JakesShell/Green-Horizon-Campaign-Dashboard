import { useState } from "react";
import { ClaimStageBadge, Topbar } from "../components/Shared.jsx";

const API_BASE = "http://localhost:8080";

export default function ClaimsPage({ portfolio, role }) {
  const claims = portfolio.campaigns.flatMap((campaign) =>
    campaign.claims.map((claim) => ({ ...claim, campaignId: campaign.id, campaignName: campaign.name, evidenceCoverage: campaign.impact.evidenceCoverage }))
  );
  const [reviewResult, setReviewResult] = useState("");

  async function submitReview(claim) {
    setReviewResult("");
    const response = await fetch(`${API_BASE}/api/claims/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-demo-role": role },
      body: JSON.stringify({
        campaignId: claim.campaignId,
        claimId: claim.id,
        reviewerRole: role,
        decision: claim.risk === "High" ? "Needs Evidence" : "Approved For Public Use",
        note: `Demo review from ${role}: claim requires evidence-aware approval workflow.`
      })
    });
    const data = await response.json();
    setReviewResult(response.ok ? data.message : data.message || data.error);
  }

  return (
    <>
      <Topbar title="Green Claim Proof Review" subtitle="Review public sustainability claims against evidence, specificity, and trust risk." />
      {reviewResult && <div className="security-notice"><p>{reviewResult}</p></div>}
      <section className="panel">
        <div className="claim-grid">
          {claims.map((claim) => (
            <article className="claim-card large" key={claim.id}>
              <div className="claim-top"><div><span>{claim.campaignName}</span><strong>{claim.id}</strong></div><ClaimStageBadge stage={claim.stage} /></div>
              <p>{claim.text}</p>
              <div className="claim-metrics">
                <div><span>Risk</span><strong>{claim.risk}</strong></div>
                <div><span>Specificity</span><strong>{claim.specificity}/100</strong></div>
                <div><span>Evidence</span><strong>{claim.evidenceIds.length} attached</strong></div>
                <div><span>Coverage</span><strong>{claim.evidenceCoverage}%</strong></div>
              </div>
              <button className="primary-link button-link" onClick={() => submitReview(claim)}>Record Simulated Review</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}