import React from "react";

const TopicsPanel = ({ topics }) => {
  return (
    <div className="glass-card p-6 h-full">
      <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
        <span className="text-xl">🔥</span> Top Topics
      </h3>
      <div className="flex flex-col gap-4">
        {topics.map((t) => (
          <div key={t.name} className="flex flex-col gap-1 group">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-300 group-hover:text-primary transition-colors">{t.name}</span>
              <span className="text-slate-500">{t.mentions}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${Math.min(100, (t.mentions / 500) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className={`text-[10px] font-bold uppercase ${t.sentiment > 0 ? 'text-accent' : 'text-red-400'}`}>
                {t.sentiment > 0 ? 'Positive' : 'Negative'}
              </span>
              <span className="text-[10px] text-slate-500">Score: {t.sentiment.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsPanel;
