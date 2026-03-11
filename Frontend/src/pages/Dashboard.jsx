import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/dashboard.css";
import { getDashboardOverview } from "../services/dashboardService";
import KpiRow from "../components/dashboard/KpiRow";
import TrendPanel from "../components/dashboard/TrendPanel";
import TopicsPanel from "../components/dashboard/TopicsPanel";
import ChannelsPanel from "../components/dashboard/ChannelsPanel";
import AlertsPreviewPanel from "../components/dashboard/AlertsPreviewPanel";
import SummaryPanel from "../components/dashboard/SummaryPanel";




const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters - NO TIME FILTER, only real channels + brands
  const [filters, setFilters] = useState({
    channel: "all",
    brand: "all",
  });

  const brandOptions = [
    { id: "all", label: "All brands" },
    { id: "echo-dot", label: "Amazon Echo Dot" },
    { id: "nest-mini", label: "Google Nest Mini" },
    { id: "homepod-mini", label: "Apple HomePod Mini" },
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const overview = await getDashboardOverview(filters);
        setData(overview);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters.channel, filters.brand]);

  if (loading) {
    return (


      <div className="dashboard" style={{ padding: "100px", textAlign: "center" }}>
        <div>Loading dashboard...</div>
      </div>

    );
  }

  if (!data) {
    return (
      <div className="dashboard empty-state">
        <div style={{ padding: "100px", textAlign: "center", color: "#94a3b8" }}>
          No dashboard data available
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Market Overview</h1>
          <p className="text-slate-400">AI-powered trend & sentiment analysis across all brands</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none transition-all cursor-pointer"
            value={filters.channel}
            onChange={(e) =>
              setFilters((f) => ({ ...f, channel: e.target.value }))
            }
          >
            <option value="all">All Channels</option>
            <option value="amazon-reviews">Amazon Reviews</option>
            <option value="youtube">YouTube Comments</option>
            <option value="news">News Articles</option>
            <option value="web-reviews">Review Sites</option>
          </select>

          <select
            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 focus:ring-2 focus:ring-primary/50 outline-none transition-all cursor-pointer"
            value={filters.brand}
            onChange={(e) =>
              setFilters((f) => ({ ...f, brand: e.target.value }))
            }
          >
            {brandOptions.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiRow summary={data.summary} />

      {/* Main Grid: Trend + Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TrendPanel trend={data.trend} />
        </div>
        <div>
          <TopicsPanel topics={data.topics} />
        </div>
      </div>

      {/* Bottom Grid: Channels + Alerts + Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ChannelsPanel channels={data.channels} />
        <AlertsPreviewPanel alerts={data.alerts} />
        <SummaryPanel text={data.summaryText} />
      </div>
    </div>
  );
};

export default Dashboard;
