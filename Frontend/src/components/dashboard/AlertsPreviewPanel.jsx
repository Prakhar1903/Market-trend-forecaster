import React from "react";

const AlertsPreviewPanel = ({ alerts }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
        <span className="text-xl">🔔</span> Recent Alerts
      </h3>
      <div className="flex flex-col gap-4">
        {alerts.map((a, idx) => (
          <div key={idx} className="flex gap-4 p-3 rounded-xl bg-slate-800/20 border border-white/5 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${a.level === 'High' ? 'bg-red-500' : a.level === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
            <div className="flex flex-col gap-1">
              <span className={`text-[10px] font-black uppercase tracking-widest ${a.level === 'High' ? 'text-red-400' : a.level === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                {a.level} Priority
              </span>
              <p className="text-sm text-slate-300 leading-tight group-hover:text-slate-100 transition-colors">{a.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPreviewPanel;
