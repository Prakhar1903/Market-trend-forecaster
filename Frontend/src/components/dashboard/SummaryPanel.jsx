import React from "react";
import {Link} from "react-router-dom";
const SummaryPanel = ({ text }) => {
  return (
    <div className="glass-card p-6 flex flex-col gap-4 bg-linear-to-br from-primary/10 to-transparent border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(56,189,248,0.2)] h-full">
      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
        <span className="text-xl">✨</span> AI Insights
      </h3>

      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
        Generated from your data
      </p>

      <p className="text-sm text-slate-300 leading-relaxed italic">
        &ldquo;{text}&rdquo;
      </p>

      <div className="pt-5 border-t border-white/10">
        <button className="text-primary text-xs font-bold hover:underline cursor-pointer flex items-center gap-1 transition-all hover:gap-2">
        <Link to="/dashboard/reports">Generate Detailed Report →</Link>  
        </button>
      </div>
    </div>
  );
};

export default SummaryPanel;