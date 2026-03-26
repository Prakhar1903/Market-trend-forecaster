import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "../common/AnimatedCounter";


const KpiRow = ({ summary, filters }) => {
  if (!summary) return null;

  const kpis = [
    {
      label: "Overall Sentiment",
      value: summary.overallSentiment * 100,
      suffix: "%",
      decimals: 0,
      color: summary.overallSentiment >= 0.2 ? "text-accent" : summary.overallSentiment <= -0.2 ? "text-red-400" : "text-primary",
      trend: summary.overallSentiment >= 0 ? "↑" : "↓",
      percentage: "12%",
      trendColor: summary.overallSentiment >= 0 ? "text-accent" : "text-red-400"
    },
    {
      label: "Total Mentions",
      value: summary.mentions,
      suffix: "",
      decimals: 0,
      color: "text-secondary",
      trend: "↑",
      percentage: "8%",
      trendColor: "text-accent"
    },
    {
      label: "Positive / Negative",
      value: summary.positivePct,
      suffix: "%",
      decimals: 2,
      subValue: summary.negativePct,
      color: "text-slate-100",
      trend: "↑",
      percentage: "5%",
      trendColor: "text-accent"
    },
    {
      label: "Active Alerts",
      value: summary.activeAlerts,
      suffix: "",
      decimals: 0,
      color: summary.activeAlerts > 0 ? "text-red-400" : "text-slate-400",
      trend: "↓",
      percentage: "2%",
      trendColor: "text-accent"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const sourceLabel = filters.source === 'all' ? 'All Sources' : filters.source.replace(/-/g, ' ').toUpperCase();
  const productLabel = filters.product === 'all' ? 'All Products' : filters.product.replace(/-/g, ' ').toUpperCase();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {kpis.map((kpi, i) => (
        <motion.div 
          key={i} 
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="glass-card p-6 relative group flex flex-col justify-between min-h-[140px] cursor-default border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
        >
          {/* Subtle Accent Bar */}
          <div className={`absolute top-0 left-0 w-1.5 h-full opacity-80 ${kpi.trendColor === 'text-accent' ? 'bg-accent shadow-[0_0_12px_#10b981]' : 'bg-red-500 shadow-[0_0_12px_#ef4444]'}`} />

          <div>
            <div className="flex justify-between items-start mb-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</p>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${kpi.trendColor} bg-white/5 px-2 py-0.5 rounded-full`}>
                {kpi.trend} {kpi.percentage}
              </div>
            </div>

            <div className={`flex flex-col gap-1 ${kpi.color}`}>
              <div className="flex items-baseline gap-2">
                {kpi.subValue !== undefined && <span className="text-[10px] font-bold text-slate-500 uppercase w-16">Positive:</span>}
                <h3 className="text-3xl font-black tracking-tighter drop-shadow-lg">
                  <AnimatedCounter value={kpi.value} suffix={kpi.suffix} decimals={kpi.decimals} duration={1.5} />
                </h3>
              </div>
              {kpi.subValue !== undefined && (
                <div className="flex items-baseline gap-2 border-t border-white/5 pt-1.5 mt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase w-16">Negative:</span>
                  <p className="text-xl font-bold tracking-tighter text-red-500 drop-shadow-md">
                    <AnimatedCounter value={kpi.subValue} suffix={kpi.suffix} decimals={kpi.decimals} duration={1.5} />
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter truncate">
              {sourceLabel} <span className="mx-1 opacity-30">|</span> {productLabel}
            </p>
          </div>

          {/* Subtle background glow */}
          <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-[40px] opacity-10 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none ${kpi.trendColor === 'text-accent' ? 'bg-accent' : 'bg-red-500'}`} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KpiRow;
