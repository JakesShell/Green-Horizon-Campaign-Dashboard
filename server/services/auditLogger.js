export function auditEvent(type, details = {}) {
  const event = {
    timestamp: new Date().toISOString(),
    type,
    actor: details.actor ?? "demo-user",
    role: details.role ?? "Viewer",
    campaignId: details.campaignId ?? null,
    action: details.action ?? "view",
    outcome: details.outcome ?? "success"
  };

  console.log(JSON.stringify({ level: "info", service: "ecosignal-api", audit: event }));
  return event;
}