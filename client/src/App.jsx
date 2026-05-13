import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Shared.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import CampaignPage from "./pages/CampaignPage.jsx";
import ChannelsPage from "./pages/ChannelsPage.jsx";
import ClaimsPage from "./pages/ClaimsPage.jsx";
import EvidencePage from "./pages/EvidencePage.jsx";
import ExecutiveReportPage from "./pages/ExecutiveReportPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SecurityAwsPage from "./pages/SecurityAwsPage.jsx";

const API_BASE = "http://localhost:8080";

export default function App() {
  const [role, setRole] = useState("Marketing Manager");
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/portfolio`, { headers: { "x-demo-role": role } })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load portfolio data");
        return response.json();
      })
      .then(setPortfolio)
      .catch((err) => setError(err.message));
  }, [role]);

  if (error) {
    return <Layout role={role} setRole={setRole}><div className="panel"><h1>EcoSignal API unavailable</h1><p>{error}. Make sure the backend is running on port 8080.</p></div></Layout>;
  }

  if (!portfolio) {
    return <Layout role={role} setRole={setRole}><div className="panel"><h1>Loading EcoSignal...</h1><p>Fetching campaign impact, trust, and performance data.</p></div></Layout>;
  }

  return (
    <Layout role={role} setRole={setRole}>
      <Routes>
        <Route path="/" element={<HomePage portfolio={portfolio} />} />
        <Route path="/campaigns/:id" element={<CampaignPage role={role} />} />
        <Route path="/channels" element={<ChannelsPage portfolio={portfolio} />} />
        <Route path="/claims" element={<ClaimsPage portfolio={portfolio} role={role} />} />
        <Route path="/evidence" element={<EvidencePage portfolio={portfolio} />} />
        <Route path="/budget" element={<BudgetPage portfolio={portfolio} />} />
        <Route path="/executive-report" element={<ExecutiveReportPage portfolio={portfolio} role={role} />} />
        <Route path="/security" element={<SecurityAwsPage />} />
      </Routes>
    </Layout>
  );
}