import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const PRODUCT_COLORS = {
  "echo-dot": {
    border: "rgba(56, 189, 248, 1)",
    bg: "rgba(56, 189, 248, 0.1)",
    label: "Echo Dot"
  },
  "nest-mini": {
    border: "rgba(16, 185, 129, 1)",
    bg: "rgba(16, 185, 129, 0.1)",
    label: "Nest Mini"
  },
  "homepod-mini": {
    border: "rgba(139, 92, 246, 1)",
    bg: "rgba(139, 92, 246, 0.1)",
    label: "HomePod Mini"
  }
};

const TrendPanel = ({ trendData, activeProduct }) => {
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const isComparisonMode = activeProduct === "all" || !activeProduct;

  const toggleSeries = (productId) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  // Compute global sorted labels
  const labels = useMemo(() => {
    if (!trendData) return [];
    const dates = new Set();
    Object.values(trendData).forEach(pts => pts.forEach(p => dates.add(p.date)));
    return Array.from(dates).sort();
  }, [trendData]);

  const getDatasets = () => {
    if (!trendData || !labels.length) return [];

    if (isComparisonMode) {
      // Comparison Mode: Multiple lines for sentiment
      return Object.entries(trendData).map(([productId, points]) => {
        const pointMap = Object.fromEntries(points.map(p => [p.date, p]));
        return {
          label: `${PRODUCT_COLORS[productId]?.label || productId} Sentiment`,
          data: labels.map(date => pointMap[date] ? pointMap[date].sentiment : null),
          borderColor: PRODUCT_COLORS[productId]?.border || "#cbd5e1",
          backgroundColor: PRODUCT_COLORS[productId]?.bg || "transparent",
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          spanGaps: true,
          yAxisID: "y-axis-1",
          hidden: hiddenSeries.has(productId),
        };
      });
    } else {
      // Single Product Mode: Sentiment vs Volume
      const points = trendData[activeProduct] || [];
      const pointMap = Object.fromEntries(points.map(p => [p.date, p]));
      return [
        {
          label: "Sentiment Score",
          data: labels.map(date => pointMap[date] ? pointMap[date].sentiment : null),
          borderColor: PRODUCT_COLORS[activeProduct]?.border || "#38bdf8",
          backgroundColor: PRODUCT_COLORS[activeProduct]?.bg || "rgba(56, 189, 248, 0.1)",
          tension: 0.4,
          fill: true,
          spanGaps: true,
          yAxisID: "y-axis-1",
        },
        {
          label: "Mentions",
          data: labels.map(date => pointMap[date] ? pointMap[date].mentions : null),
          borderColor: "rgba(244, 63, 94, 1)",
          backgroundColor: "rgba(244, 63, 94, 0.05)",
          tension: 0.4,
          fill: true,
          borderDash: [5, 5],
          spanGaps: true,
          yAxisID: "y-axis-2",
        }
      ];
    }
  };

  const chartData = {
    labels,
    datasets: getDatasets(),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 🔥 Disable built-in legend
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#f1f5f9",
        bodyColor: "#94a3b8",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (items) => {
            return `Analysis for ${items[0].label}`;
          },
          label: function (context) {
            const date = labels[context.dataIndex];
            if (isComparisonMode) {
              const productId = Object.keys(trendData)[context.datasetIndex];
              const productName = PRODUCT_COLORS[productId]?.label || productId;
              const point = trendData[productId].find(p => p.date === date);
              if (!point) return [];
              return [
                `Product: ${productName}`,
                `Sentiment: ${(point.sentiment * 100).toFixed(1)}%`,
                `Mentions: ${point.mentions.toLocaleString()}`
              ];
            } else {
              const point = trendData[activeProduct].find(p => p.date === date);
              if (!point) return [];
              if (context.datasetIndex === 0) {
                return `Sentiment: ${(point.sentiment * 100).toFixed(1)}%`;
              } else {
                return `Mentions: ${point.mentions.toLocaleString()}`;
              }
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#64748b", font: { size: 10 } }
      },
      "y-axis-1": {
        position: "left",
        min: -1,
        max: 1,
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: {
          color: "#94a3b8",
          callback: (val) => `${(val * 100).toFixed(0)}%`
        },
        title: { display: true, text: "Sentiment", color: "#64748b", font: { size: 10, weight: "bold" } }
      },
      "y-axis-2": {
        position: "right",
        display: !isComparisonMode,
        grid: { drawOnChartArea: false },
        ticks: { color: "#f43f5e" },
        title: { display: true, text: "Mentions", color: "#f43f5e", font: { size: 10, weight: "bold" } }
      }
    },
    interaction: { mode: "index", intersect: false }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-6 min-h-[350px] flex flex-col gap-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      {/* Subtle radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-primary">📈</span> Sentiment & Volume Trends
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {isComparisonMode
              ? "Comparing brand sentiment performance across all segments"
              : `Deep dive into performance metrics for ${PRODUCT_COLORS[activeProduct]?.label || activeProduct}`}
          </p>
        </div>

        {/* 🔥 Custom Interactive Legend */}
        {isComparisonMode && (
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(PRODUCT_COLORS).map(([id, config]) => {
              const isHidden = hiddenSeries.has(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleSeries(id)}
                  title={`Toggle ${config.label} visibility`}
                  className={`group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isHidden
                      ? "bg-slate-900/40 border-slate-800 text-slate-600 opacity-60 grayscale"
                      : "bg-white/5 border-white/20 text-slate-100 shadow-lg shadow-white/5 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ring-4 transition-all duration-300 ${
                      isHidden 
                        ? "bg-slate-500 ring-slate-800/20" 
                        : "ring-white/5"
                    }`}
                    style={{ backgroundColor: isHidden ? undefined : config.border }}
                  />
                  <span className={`text-xs font-bold tracking-wide transition-all ${isHidden ? 'line-through decoration-slate-700 decoration-2' : ''}`}>
                    {config.label}
                  </span>
                  
                  {/* Tooltip Hint */}
                  {!isHidden && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl z-50">
                      Click to Hide
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex-1 min-h-87.5">
        {trendData && Object.keys(trendData).length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 border border-dashed border-white/10 rounded-2xl bg-white/5">
            No trend data found for this selection
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TrendPanel;
