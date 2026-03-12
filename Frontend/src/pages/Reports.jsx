// src/pages/Reports.jsx
import React, { useState } from "react";
import "../styles/reports.css";
import { generateReport } from "../services/reportsService";

const Reports = () => {
  const [brand, setBrand] = useState("all");
  const [channel, setChannel] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (type, format) => {
    try {
      setError("");
      setLoading(true);

      await generateReport({
        type,        // "summary" | "trend" | "alerts" | "topics"
        format,      // "pdf" | "xlsx"
        brand,
        channel,
        fromDate,
        toDate,
      });

    } catch (err) {
      console.error(err);
      setError("Failed to download report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel reports-panel">
      <div className="panel-header">
        <h3>Reports</h3>
        <p className="reports-subtitle">
          Export AI-powered sentiment and trend insights as PDF or Excel for your team.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="reports-filters">
        <div className="filter-group">
          <label>Brand</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="all">All Products</option>
            <option value="echo-dot">Echo Dot</option>
            <option value="nest-mini">Nest Mini</option>
            <option value="homepod-mini">HomePod Mini</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Channel</label>
          <select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="all">All Channels</option>
            <option value="social">Social</option>
            <option value="reviews">Reviews</option>
            <option value="news">News</option>
          </select>
        </div>

        <div className="filter-group">
          <label>From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="reports-error">{error}</div>}

      {/* REPORT CARDS */}
      <div className="reports-grid">
        {/* Campaign Summary */}
        <ReportCard
          title="Campaign Summary"
          description="Overall sentiment, volume and key KPIs by brand and channel."
          onPdf={() => handleDownload("summary", "pdf")}
          onExcel={() => handleDownload("summary", "xlsx")}
          loading={loading}
        />

        {/* Trend & Forecast */}
        <ReportCard
          title="Trend & Forecast"
          description="Sentiment & volume over time with week-over-week changes."
          onPdf={() => handleDownload("trend", "pdf")}
          onExcel={() => handleDownload("trend", "xlsx")}
          loading={loading}
        />

        {/* Alerts & Risk */}
        <ReportCard
          title="Alerts & Risk"
          description="Critical sentiment drops, spikes and brand-level risks."
          onPdf={() => handleDownload("alerts", "pdf")}
          onExcel={() => handleDownload("alerts", "xlsx")}
          loading={loading}
        />

        {/* Topics & Themes */}
        <ReportCard
          title="Topics & Themes"
          description="Top positive/negative topics with volumes and sentiment."
          onPdf={() => handleDownload("topics", "pdf")}
          onExcel={() => handleDownload("topics", "xlsx")}
          loading={loading}
        />
      </div>
    </div>
  );
};

const ReportCard = ({ title, description, onPdf, onExcel, loading }) => (
  <div className="report-card">
    <h4 className="report-title">{title}</h4>
    <p className="report-desc">{description}</p>

    <div className="report-actions">
      <button
        className="report-btn pdf"
        onClick={onPdf}
        disabled={loading}
      >
        {loading ? "Preparing..." : "Download PDF"}
      </button>
      <button
        className="report-btn excel"
        onClick={onExcel}
        disabled={loading}
      >
        {loading ? "Preparing..." : "Download Excel"}
      </button>
    </div>
  </div>
);

export default Reports;
