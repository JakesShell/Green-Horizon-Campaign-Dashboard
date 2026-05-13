import { Topbar } from "../components/Shared.jsx";

export default function EvidencePage({ portfolio }) {
  const evidence = portfolio.campaigns.flatMap((campaign) => campaign.evidence.map((item) => ({ ...item, campaignName: campaign.name })));

  return (
    <>
      <Topbar title="Evidence Vault" subtitle="Track proof sources behind sustainability claims and impact reporting." />
      <section className="panel">
        <div className="evidence-grid">
          {evidence.map((item) => (
            <article className="evidence-card" key={item.id}>
              <span>{item.campaignName}</span>
              <h3>{item.title}</h3>
              <p>{item.type} | Owner: {item.owner}</p>
              <div className="detail-grid">
                <div><span>Status</span><strong>{item.status}</strong></div>
                <div><span>Confidence</span><strong>{item.confidence}</strong></div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}