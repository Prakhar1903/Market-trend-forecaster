import React from "react";

const ChannelsPanel = ({ channels }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
        <span className="text-xl">🌐</span> Channels
      </h3>
      <div className="flex flex-col gap-3">
        {channels.map((c) => (
          <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all group">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-200">{c.name}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">{c.mentions} mentions</span>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold ${c.sentiment > 0 ? 'bg-accent/10 text-accent' : 'bg-red-400/10 text-red-400'}`}>
              {(c.sentiment * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelsPanel;
