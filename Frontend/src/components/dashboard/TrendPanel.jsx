import React from "react";
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
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendPanel = ({ trend }) => {
  const chartData = {
    labels: trend?.map(item => item.date) || [],
    datasets: [
      {
        label: "Sentiment Score",
        data: trend?.map(item => item.sentiment) || [],
        borderColor: "rgba(56, 189, 248, 1)",
        backgroundColor: "rgba(56, 189, 248, 0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "y-sentiment",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "Volume (Mentions)",
        data: trend?.map(item => item.mentions) || [],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
        yAxisID: "y-volume",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { color: "rgba(148, 163, 184, 0.2)" },
        ticks: {
          color: "#94a3b8",
          maxRotation: 45,
          callback: function (value, index, ticks) {
            // Get date from your trend data
            if (trend && trend[index]) {
              const date = new Date(trend[index].date);
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }); // "Feb 15"
            }
            return '';
          }
        },
      },



      "y-sentiment": {
        type: "linear",
        position: "left",
        min: -1,
        max: 1,
        grid: { drawOnChartArea: false },
        ticks: {
          color: "rgba(56, 189, 248, 0.8)",
          callback: function (value) {
            return (value * 100).toFixed(0) + "%";
          },
        },
        title: {
          display: true,
          text: "Sentiment Score",
          color: "#38bdf8",
        },
      },
      "y-volume": {
        type: "linear",
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: { color: "rgba(34, 197, 94, 0.8)" },
        title: {
          display: true,
          text: "Mentions",
          color: "#22c55e",
        },
      },
    },
    interaction: { intersect: false, mode: "index" },
  };

  return (
    <div className="glass-card p-8 min-h-[500px] flex flex-col gap-6">
      {/* BRAND SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/40 p-4 rounded-xl border-l-4 border-primary">
          <div className="text-xs font-bold text-slate-500 uppercase">Echo Dot</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">+15%</span>
            <span className="text-xs text-slate-400">1.2k mentions</span>
          </div>
        </div>
        <div className="bg-slate-800/40 p-4 rounded-xl border-l-4 border-accent">
          <div className="text-xs font-bold text-slate-500 uppercase">Nest Mini</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-accent">-5%</span>
            <span className="text-xs text-slate-400">890 mentions</span>
          </div>
        </div>
        <div className="bg-slate-800/40 p-4 rounded-xl border-l-4 border-secondary">
          <div className="text-xs font-bold text-slate-500 uppercase">HomePod</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-secondary">+32%</span>
            <span className="text-xs text-slate-400">589 mentions</span>
          </div>
        </div>
      </div>

      {/* CHART HEADER */}
      <div>
        <h3 className="text-xl font-bold text-slate-100">Sentiment & Volume Over Time</h3>
        <p className="text-sm text-slate-500">Real-time analysis across selected market segments</p>
      </div>

      <div className="flex-1 min-h-[300px] relative">
        {trend && trend.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 bg-slate-800/20 rounded-2xl border border-white/5 border-dashed">
            <div className="text-4xl mb-2">📈</div>
            <div className="font-medium">Analysis data loading...</div>
            <div className="text-xs opacity-60">Crunching sentiment across 2,679 data points</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendPanel;
