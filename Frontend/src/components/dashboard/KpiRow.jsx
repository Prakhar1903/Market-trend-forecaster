import React from "react";

const KpiRow = ({ summary }) => {
  if (!summary) return null;

  const kpis = [
    { label: "Overall Sentiment", value: summary.overallSentiment.toFixed(2), color: "text-primary" },
    { label: "Total Mentions", value: summary.mentions, color: "text-secondary" },
    { label: "Positive / Negative", value: `${summary.positivePct}% / ${summary.negativePct}%`, color: "text-accent" },
    { label: "Active Alerts", value: summary.activeAlerts, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <div key={i} className="glass-card p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{kpi.label}</p>
          <div className="flex items-end justify-between">
            <h3 className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiRow;
