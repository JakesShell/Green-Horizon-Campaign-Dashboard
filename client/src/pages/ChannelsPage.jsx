import { Topbar } from "../components/Shared.jsx";

export default function ChannelsPage({ portfolio }) {
  const channels = portfolio.campaigns.flatMap((campaign) =>
    campaign.analytics.channels.map((channel) => ({ ...channel, campaign: campaign.name }))
  );

  return (
    <>
      <Topbar title="Channel Analytics" subtitle="Compare campaign reach, engagement, conversion quality, spend, and verified impact actions." />
      <section className="panel">
        <div className="data-table">
          <div className="data-row header"><span>Campaign</span><span>Channel</span><span>Spend</span><span>Reach</span><span>Conversions</span><span>Impact / $</span><span>Sentiment</span></div>
          {channels.map((channel) => (
            <div className="data-row" key={`${channel.campaign}-${channel.name}`}>
              <span>{channel.campaign}</span><strong>{channel.name}</strong><span>${channel.spend.toLocaleString()}</span><span>{channel.reach.toLocaleString()}</span><span>{channel.conversions.toLocaleString()}</span><strong>{channel.impactPerDollar}</strong><span>{channel.sentiment}/100</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}