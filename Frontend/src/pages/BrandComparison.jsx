// import '../styles/brandcomparison.css';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler

} from 'chart.js';
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const BrandComparison = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real API later
  useEffect(() => {
    const mockData = [
      {
        name: "Echo Dot",
        sentiment: 0.15,
        mentions: 1200,
        positive: 62,
        negative: 18,
        trend: [
          { date: "2026-02-15", sentiment: 0.12, mentions: 180 },
          { date: "2026-02-16", sentiment: 0.18, mentions: 200 },
          { date: "2026-02-17", sentiment: 0.14, mentions: 190 },
        ]
      },
      {
        name: "Nest Mini",
        sentiment: -0.45,
        mentions: 890,
        positive: 28,
        negative: 52,
        trend: [
          { date: "2026-02-15", sentiment: -0.42, mentions: 140 },
          { date: "2026-02-16", sentiment: -0.48, mentions: 160 },
          { date: "2026-02-17", sentiment: -0.45, mentions: 150 },
        ]
      },
      {
        name: "HomePod Mini",
        sentiment: 0.32,
        mentions: 589,
        positive: 71,
        negative: 12,
        trend: [
          { date: "2026-02-15", sentiment: 0.28, mentions: 90 },
          { date: "2026-02-16", sentiment: 0.35, mentions: 110 },
          { date: "2026-02-17", sentiment: 0.33, mentions: 105 },
        ]
      }
    ];
    setBrands(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        <div>Loading brand comparison...</div>
      </div>
    );
  }

  //   useEffect(() => {
  //   async function loadBrands() {
  //     setLoading(true);
  //     try {
  //       const data = await getBrandComparison(dateRange);  // ✅ Real API call
  //       setBrands(data);
  //     } catch (error) {
  //       console.error('Brand comparison error:', error);
  //       // Fallback to mock data if needed
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadBrands();
  // }, [dateRange]);
  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Brand Comparison</h1>
          <p className="text-slate-400">Side-by-side analysis of smart speaker market performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 outline-none cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* METRICS TABLE */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="text-primary">📊</span> Performance Metrics
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-white/10">
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Sentiment</th>
                <th className="px-6 py-4">Mentions</th>
                <th className="px-6 py-4">Positive %</th>
                <th className="px-6 py-4">Negative %</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {brands.map((brand, index) => (
                <tr key={brand.name} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-200 group-hover:text-primary transition-colors">{brand.name}</td>
                  <td className={`px-6 py-4 font-mono font-bold ${brand.sentiment >= 0 ? 'text-accent' : 'text-red-400'}`}>
                    {(brand.sentiment * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-slate-400">{brand.mentions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-accent font-medium">{brand.positive}%</td>
                  <td className="px-6 py-4 text-red-400 font-medium">{brand.negative}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${brand.sentiment >= 0 ? 'bg-accent/10 text-accent' : 'bg-red-400/10 text-red-400'
                      }`}>
                      {brand.sentiment >= 0 ? 'Stable' : 'Critical'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRENDS CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {brands.map((brand) => (
          <div key={brand.name} className="glass-card p-6 flex flex-col gap-4">
            <h3 className="font-bold text-slate-200 flex justify-between px-2">
              <span>{brand.name}</span>
              <span className="text-xs text-slate-500">Sentiment Trend</span>
            </h3>
            <div className="h-64 relative">
              <Line
                data={{
                  labels: brand.trend.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
                  datasets: [{
                    label: 'Sentiment',
                    data: brand.trend.map(d => d.sentiment * 100),
                    borderColor: brand.name.includes('Echo') ? '#38bdf8' : brand.name.includes('Nest') ? '#10b981' : '#818cf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                    y: { min: -100, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 10 }, callback: v => v + '%' } }
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* VOLUME COMPARISON */}
      <div className="glass-card p-8">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <span className="text-secondary">📊</span> Mentions Volume Comparison
        </h2>
        <div className="h-96">
          <Bar
            data={{
              labels: brands.map(b => b.name),
              datasets: [{
                label: 'Total Mentions',
                data: brands.map(b => b.mentions),
                backgroundColor: [
                  'rgba(56, 189, 248, 0.6)',
                  'rgba(34, 197, 94, 0.6)',
                  'rgba(129, 140, 248, 0.6)'
                ],
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)'
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandComparison;
