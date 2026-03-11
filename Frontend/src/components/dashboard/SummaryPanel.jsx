import React from "react";

const SummaryPanel = ({ text }) => {
  return (
    <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
      <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
        <span className="text-xl">✨</span> AI Insights
      </h3>
      <div className="space-y-4">
        <p className="text-sm text-slate-300 leading-relaxed italic">
          "{text}"
        </p>
        <div className="pt-4 border-t border-white/10">
          <button className="text-primary text-xs font-bold hover:underline cursor-pointer flex items-center gap-1">
            Generate Detailed Report →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
