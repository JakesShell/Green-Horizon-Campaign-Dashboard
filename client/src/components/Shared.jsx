import { ArrowLeft, BarChart3, ChevronRight, Home, Leaf, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Logo() {
  return (
    <Link className="brand-lockup" to="/">
      <div className="brand-mark"><Leaf size={20} /></div>
      <div><strong>EcoSignal</strong><span>by JSA Enterprise</span></div>
    </Link>
  );
}

export function Layout({ children, role, setRole }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Logo />
        <nav>
          <Link to="/">Impact Overview</Link>
          <Link to="/channels">Channel Analytics</Link>
          <Link to="/claims">Claim Proof Review</Link>
          <Link to="/evidence">Evidence Vault</Link>
          <Link to="/budget">Budget Intelligence</Link>
          <Link to="/executive-report">Executive Report</Link>
          <Link to="/security">Security & AWS</Link>
        </nav>
        <div className="role-card">
          <span>Demo Role</span>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option>Marketing Manager</option>
            <option>ESG Reviewer</option>
            <option>Legal Reviewer</option>
            <option>Executive</option>
            <option>Viewer</option>
          </select>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}

export function Topbar({ title, subtitle }) {
  const navigate = useNavigate();
  return (
    <header className="topbar">
      <div>
        <div className="breadcrumbs">
          <Link to="/"><Home size={14} /> Home</Link>
          <ChevronRight size={14} />
          <span>{title}</span>
        </div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <button className="ghost-button" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back</button>
        <Link className="ghost-button" to="/"><Home size={16} /> Home</Link>
      </div>
    </header>
  );
}

export function MetricCard({ label, value, note, icon = BarChart3 }) {
  const Icon = icon;
  return (
    <article className="metric-card">
      <div className="metric-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

export function ScoreRing({ value, label }) {
  return (
    <div className="score-ring" style={{ "--score": `${value}%` }}>
      <div><strong>{value}</strong><span>{label}</span></div>
    </div>
  );
}

export function TrustBadge({ score }) {
  let label = "Ready";
  let className = "good";
  if (score < 55) { label = "Needs Evidence"; className = "danger"; }
  else if (score < 72) { label = "Review"; className = "warn"; }
  return <span className={`pill ${className}`}>{label}</span>;
}

export function ClaimStageBadge({ stage }) {
  let className = "neutral";
  if (stage.includes("Approved")) className = "good";
  if (stage.includes("Needs") || stage.includes("Legal") || stage.includes("ESG")) className = "warn";
  if (stage.includes("Rejected")) className = "danger";
  return <span className={`pill ${className}`}>{stage}</span>;
}

export function SecurityNotice() {
  return (
    <div className="security-notice">
      <ShieldCheck size={18} />
      <p>Demo data only. Includes validation, role-aware workflows, secure headers, rate limiting, audit logging, and AWS-ready configuration notes.</p>
    </div>
  );
}