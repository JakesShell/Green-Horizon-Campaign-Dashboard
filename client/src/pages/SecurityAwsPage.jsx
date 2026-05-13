import { Topbar } from "../components/Shared.jsx";

export default function SecurityAwsPage() {
  return (
    <>
      <Topbar title="Security & AWS Readiness" subtitle="Portfolio-grade controls showing how EcoSignal is prepared for secure cloud deployment." />
      <section className="two-column">
        <div className="panel">
          <p className="eyebrow">Security Controls</p>
          <h2>Application safeguards</h2>
          <ul className="check-list">
            <li>Helmet security headers</li>
            <li>CORS restricted through CLIENT_ORIGIN</li>
            <li>Rate limiting on API requests</li>
            <li>Zod validation for claim review actions</li>
            <li>Role-aware simulated access control</li>
            <li>Centralized error response handling</li>
            <li>Structured audit logging for review events</li>
            <li>No real customer, ESG, or legal data</li>
          </ul>
        </div>
        <div className="panel">
          <p className="eyebrow">AWS Ready</p>
          <h2>Cloud deployment path</h2>
          <ul className="check-list">
            <li>Dockerfile for containerized backend</li>
            <li>GET /health endpoint for load balancer checks</li>
            <li>.env.example for environment configuration</li>
            <li>CloudWatch-ready JSON request logs</li>
            <li>GitHub Actions CI workflow</li>
            <li>CDK architecture notes included</li>
            <li>S3 + CloudFront frontend path documented</li>
            <li>ECS Fargate backend path documented</li>
          </ul>
        </div>
      </section>
    </>
  );
}