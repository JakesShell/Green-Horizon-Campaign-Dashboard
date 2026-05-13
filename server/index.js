import express from "express";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { auditEvent } from "./services/auditLogger.js";
import { buildPortfolio, calculateCampaignScore, createExecutiveReport } from "./services/impactEngine.js";
import { configureSecurity, requireRole } from "./middleware/security.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(__dirname, relativePath), "utf8"));
}

const campaigns = readJson("./data/campaigns.json");
const app = express();
const port = Number(process.env.PORT ?? 8080);

configureSecurity(app);
app.use(express.json({ limit: "250kb" }));

app.use((req, res, next) => {
  const started = Date.now();
  res.on("finish", () => {
    console.log(JSON.stringify({
      level: "info",
      service: "ecosignal-api",
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - started
    }));
  });
  next();
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "ecosignal-api",
    environment: process.env.NODE_ENV ?? "development"
  });
});

app.get("/api/portfolio", (req, res) => {
  auditEvent("portfolio.view", { role: req.header("x-demo-role") ?? "Viewer", action: "view-portfolio" });
  res.json(buildPortfolio(campaigns));
});

app.get("/api/campaigns/:id", (req, res) => {
  const campaign = campaigns.find((item) => item.id === req.params.id);
  if (!campaign) return res.status(404).json({ error: "Campaign not found" });

  auditEvent("campaign.view", {
    role: req.header("x-demo-role") ?? "Viewer",
    campaignId: campaign.id,
    action: "view-campaign"
  });

  res.json({ ...campaign, analytics: calculateCampaignScore(campaign) });
});

app.get("/api/campaigns/:id/report", (req, res) => {
  const campaign = campaigns.find((item) => item.id === req.params.id);
  if (!campaign) return res.status(404).json({ error: "Campaign not found" });

  const enriched = { ...campaign, analytics: calculateCampaignScore(campaign) };
  auditEvent("report.generate", {
    role: req.header("x-demo-role") ?? "Viewer",
    campaignId: campaign.id,
    action: "generate-executive-report"
  });

  res.json(createExecutiveReport(enriched));
});

const claimReviewSchema = z.object({
  campaignId: z.string().min(3),
  claimId: z.string().min(3),
  reviewerRole: z.enum(["Marketing Manager", "ESG Reviewer", "Legal Reviewer", "Executive"]),
  decision: z.enum(["Approved For Public Use", "Needs Evidence", "Legal Review", "Rejected / Too Risky"]),
  note: z.string().min(10).max(500)
});

app.post("/api/claims/review", requireRole(["ESG Reviewer", "Legal Reviewer", "Executive"]), (req, res) => {
  const parsed = claimReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid claim review payload", details: parsed.error.flatten() });
  }

  const event = auditEvent("claim.review", {
    actor: "demo-reviewer",
    role: parsed.data.reviewerRole,
    campaignId: parsed.data.campaignId,
    action: `claim-${parsed.data.decision}`,
    outcome: "recorded"
  });

  res.status(201).json({
    message: "Claim review recorded in simulated audit log.",
    review: parsed.data,
    audit: event
  });
});

app.use((err, req, res, next) => {
  console.error(JSON.stringify({ level: "error", service: "ecosignal-api", route: req.originalUrl, message: err.message }));
  res.status(500).json({ error: "Internal server error", message: "A controlled error response was returned. Details are logged server-side." });
});

app.listen(port, () => {
  console.log(`EcoSignal API running on http://localhost:${port}`);
});