import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildPortfolio, calculateCampaignScore, calculateClaimRiskScore } from "../services/impactEngine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(__dirname, relativePath), "utf8"));
}

const campaigns = readJson("../data/campaigns.json");
const portfolio = buildPortfolio(campaigns);

assert.equal(portfolio.metrics.activeCampaigns, campaigns.length, "All campaigns should be included.");
assert.ok(portfolio.metrics.highTrustRisk >= 1, "At least one campaign should show elevated trust risk.");

const refillCampaign = campaigns.find((campaign) => campaign.id === "green-horizon-refill");
const analytics = calculateCampaignScore(refillCampaign);

assert.ok(analytics.scores.impactScore >= 50, "Refill campaign should have meaningful sustainability impact.");
assert.ok(analytics.scores.trustReadinessScore > 0, "Trust readiness should be calculated.");

const vagueClaim = refillCampaign.claims.find((claim) => claim.id === "GH-CLM-02");
assert.ok(calculateClaimRiskScore(vagueClaim) >= 70, "Vague unsupported claims should be high risk.");

console.log("EcoSignal impact engine tests passed.");