import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import BrandComparison from "../pages/BrandComparison";
import SentimentExplorer from "../pages/SentimentExplorer";
import Alerts from "../pages/Alerts";
import DashboardLayout from "../components/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* DASHBOARD LAYOUT — all dashboard + profile pages share sidebar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />                              {/* /dashboard         */}
        <Route path="brands" element={<BrandComparison />} />             {/* /dashboard/brands   */}
        <Route path="explorer" element={<SentimentExplorer />} />           {/* /dashboard/explorer */}
        <Route path="alerts" element={<Alerts />} />                      {/* /dashboard/alerts   */}
        <Route path="profile" element={<Profile />} />                     {/* /dashboard/profile  */}
        <Route path="reports" element={<ReportsPlaceholder />} />          {/* /dashboard/reports  */}
        <Route path="chatbot" element={<ChatbotPlaceholder />} />          {/* /dashboard/chatbot  */}
      </Route>
    </Routes>
  );
};

/* ── Placeholder pages ─────────────────────────────────────────────────────── */
function PlaceholderCard({ icon, title, subtitle, eta }) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">{title}</h1>
      <p className="text-slate-400">{subtitle}</p>
    </div>
  );
}

function ReportsPlaceholder() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Reports</h1>
        <p className="text-slate-400">Export and schedule AI-generated market intelligence reports</p>
      </div>
      <div className="glass-card p-16 flex flex-col items-center gap-6 text-center border-dashed border-white/10">
        <div className="text-6xl">📋</div>
        <div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">Reports Coming Soon</h3>
          <p className="text-slate-400 max-w-md">
            Generate PDF and CSV reports of sentiment trends, brand performance, and AI insights.
            Scheduled reports and email delivery will be available in the next release.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Estimated Release: Q2 2026
        </div>
      </div>
    </div>
  );
}

function ChatbotPlaceholder() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">AI Chatbot</h1>
        <p className="text-slate-400">Ask questions about your market data in natural language</p>
      </div>
      <div className="glass-card p-16 flex flex-col items-center gap-6 text-center border-dashed border-white/10">
        <div className="text-6xl">🤖</div>
        <div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">AI Assistant Coming Soon</h3>
          <p className="text-slate-400 max-w-md">
            Chat with an AI that understands your brand sentiment data. Ask questions like
            "Why did Echo Dot sentiment drop last week?" and get instant AI-powered answers.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-bold">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Powered by Gemini · Coming Q2 2026
        </div>
      </div>
    </div>
  );
}

export default AppRoutes;
