export function percent(numerator, denominator) {
  if (!denominator) return 0;
  return Math.round((numerator / denominator) * 100);
}

export function calculateChannelMetrics(channel) {
  const costPerEngagement = channel.engagements ? channel.spend / channel.engagements : 0;
  const costPerConversion = channel.conversions ? channel.spend / channel.conversions : 0;
  const impactPerDollar = channel.spend ? channel.impactActions / channel.spend : 0;
  const conversionRate = percent(channel.conversions, channel.reach);
  const engagementRate = percent(channel.engagements, channel.reach);

  return {
    ...channel,
    costPerEngagement: Number(costPerEngagement.toFixed(2)),
    costPerConversion: Number(costPerConversion.toFixed(2)),
    impactPerDollar: Number(impactPerDollar.toFixed(3)),
    conversionRate,
    engagementRate
  };
}

export function calculateClaimRiskScore(claim) {
  let score = 0;
  if (claim.risk === "High") score += 35;
  if (claim.risk === "Moderate") score += 18;
  if (claim.evidenceIds.length === 0) score += 30;
  if (claim.specificity < 50) score += 24;
  if (claim.stage.includes("Rejected")) score += 30;
  if (claim.stage.includes("Needs Evidence")) score += 18;
  return Math.min(100, score);
}

export function calculateCampaignScore(campaign) {
  const channels = campaign.channels.map(calculateChannelMetrics);
  const totalReach = channels.reduce((sum, channel) => sum + channel.reach, 0);
  const totalEngagements = channels.reduce((sum, channel) => sum + channel.engagements, 0);
  const totalConversions = channels.reduce((sum, channel) => sum + channel.conversions, 0);
  const totalImpactActions = channels.reduce((sum, channel) => sum + channel.impactActions, 0);

  const engagementScore = Math.min(100, percent(totalEngagements, Math.max(totalReach * 0.05, 1)));
  const conversionScore = Math.min(100, percent(totalConversions, Math.max(totalReach * 0.02, 1)));
  const budgetUsed = percent(campaign.spendToDate, campaign.budget);
  const budgetEfficiencyScore = Math.max(0, Math.min(100, 110 - budgetUsed + Math.round(totalImpactActions / 300)));
  const impactScore = Math.min(100, Math.round(
    campaign.impact.evidenceCoverage * 0.35 +
    Math.min(100, campaign.impact.pledgesCompleted / 80) * 0.2 +
    Math.min(100, campaign.impact.co2KgAvoided / 150) * 0.25 +
    Math.min(100, campaign.impact.reusableUnitsAdopted / 250) * 0.2
  ));

  const claimRiskScores = campaign.claims.map(calculateClaimRiskScore);
  const greenwashingRiskScore = Math.min(100, Math.round(
    (claimRiskScores.reduce((sum, risk) => sum + risk, 0) / Math.max(claimRiskScores.length, 1)) * 0.75 +
    (100 - campaign.impact.evidenceCoverage) * 0.25
  ));

  const evidenceStrengthScore = Math.min(100, Math.round(campaign.impact.evidenceCoverage * 0.7 + campaign.impact.partnerProofCount * 4));

  const trustReadinessScore = Math.max(0, Math.round(
    (engagementScore + conversionScore + impactScore + evidenceStrengthScore + budgetEfficiencyScore) / 5 -
    greenwashingRiskScore * 0.28
  ));

  let decision = "Scale Campaign";
  if (greenwashingRiskScore >= 70) decision = "Hold Public Claims";
  else if (trustReadinessScore < 55) decision = "Add Evidence";
  else if (budgetEfficiencyScore < 50) decision = "Reduce Spend";
  else if (conversionScore < 45) decision = "Fix Messaging";
  else if (campaign.status === "Monitoring") decision = "Continue Monitoring";

  const bestChannel = [...channels].sort((a, b) => b.impactPerDollar - a.impactPerDollar)[0];
  const weakestChannel = [...channels].sort((a, b) => a.impactPerDollar - b.impactPerDollar)[0];

  return {
    campaignId: campaign.id,
    channels,
    totals: {
      reach: totalReach,
      engagements: totalEngagements,
      conversions: totalConversions,
      impactActions: totalImpactActions,
      spendToDate: campaign.spendToDate,
      budgetRemaining: campaign.budget - campaign.spendToDate,
      budgetUsed
    },
    scores: {
      engagementScore,
      conversionScore,
      budgetEfficiencyScore,
      impactScore,
      evidenceStrengthScore,
      greenwashingRiskScore,
      trustReadinessScore
    },
    decision,
    bestChannel: bestChannel?.name ?? "N/A",
    weakestChannel: weakestChannel?.name ?? "N/A",
    recommendation: generateRecommendation(bestChannel, weakestChannel, greenwashingRiskScore, trustReadinessScore)
  };
}

export function generateRecommendation(bestChannel, weakestChannel, greenwashingRiskScore, trustReadinessScore) {
  if (greenwashingRiskScore >= 70) return "Hold broad sustainability claims until stronger evidence is attached and legal/ESG review is complete.";
  if (trustReadinessScore < 55) return "Improve evidence coverage and replace vague eco claims with specific, measurable impact statements.";
  if (bestChannel && weakestChannel && bestChannel.name !== weakestChannel.name) {
    return `${bestChannel.name} is producing stronger verified impact per dollar than ${weakestChannel.name}. Reallocate remaining budget toward the stronger channel and review weak messaging.`;
  }
  return "Campaign is stable. Continue monitoring claim proof, evidence coverage, conversion quality, and budget efficiency.";
}

export function buildPortfolio(campaigns) {
  const enrichedCampaigns = campaigns.map((campaign) => ({
    ...campaign,
    analytics: calculateCampaignScore(campaign)
  }));

  const avg = (items) => Math.round(items.reduce((sum, item) => sum + item, 0) / items.length);

  return {
    metrics: {
      activeCampaigns: enrichedCampaigns.length,
      highTrustRisk: enrichedCampaigns.filter((campaign) => campaign.analytics.scores.greenwashingRiskScore >= 60).length,
      averageTrustReadiness: avg(enrichedCampaigns.map((campaign) => campaign.analytics.scores.trustReadinessScore)),
      averageImpact: avg(enrichedCampaigns.map((campaign) => campaign.analytics.scores.impactScore)),
      approvedClaims: enrichedCampaigns.flatMap((campaign) => campaign.claims).filter((claim) => claim.stage === "Approved For Public Use").length,
      claimsNeedingEvidence: enrichedCampaigns.flatMap((campaign) => campaign.claims).filter((claim) => claim.stage.includes("Needs Evidence") || claim.risk === "High").length,
      totalSpend: enrichedCampaigns.reduce((sum, campaign) => sum + campaign.spendToDate, 0),
      totalBudget: enrichedCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0),
      totalCo2Avoided: enrichedCampaigns.reduce((sum, campaign) => sum + campaign.impact.co2KgAvoided, 0),
      totalPlasticAvoided: enrichedCampaigns.reduce((sum, campaign) => sum + campaign.impact.plasticKgAvoided, 0)
    },
    campaigns: enrichedCampaigns
  };
}

export function createExecutiveReport(campaign) {
  const analytics = campaign.analytics ?? calculateCampaignScore(campaign);
  const highRiskClaims = campaign.claims.filter((claim) => claim.risk === "High").length;

  return {
    title: `${campaign.name} Executive Impact Report`,
    summary: `${campaign.name} is in ${campaign.stage} with a trust readiness score of ${analytics.scores.trustReadinessScore}/100 and an impact score of ${analytics.scores.impactScore}/100.`,
    performance: `The campaign reached ${analytics.totals.reach.toLocaleString()} people and generated ${analytics.totals.conversions.toLocaleString()} conversions across ${campaign.channels.length} channels.`,
    trust: highRiskClaims > 0 ? `${highRiskClaims} claim(s) require evidence or wording review before expanded public promotion.` : "Current public-facing claims are supported enough for continued promotion.",
    recommendation: analytics.recommendation,
    decision: analytics.decision
  };
}