import React from "react";
import { useNavigate } from "react-router-dom";

const AlertsPreviewPanel = ({ alerts }) => {
  const navigate = useNavigate();

  const levelColor = (l = "") => {
    const lvl = l.toLowerCase();
    if (lvl === "high" || lvl === "critical") return { bar: "bg-red-500", label: "text-red-400" };
    if (lvl === "medium") return { bar: "bg-yellow-500", label: "text-yellow-400" };
    return { bar: "bg-blue-500", label: "text-blue-400" };
  };

  return (
    <div className="glass-card p-6 flex flex-col gap-4 max-h-[520px]">

      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
        <span className="text-xl">🔔</span> Recent Alerts
      </h3>

      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
        Latest AI-detected anomalies
      </p>

      <div className="flex flex-col gap-3 overflow-y-auto pr-2">
        {(alerts || []).map((a, idx) => {
          const { bar, label } = levelColor(a.level);
          return (
            <div key={idx} className="flex gap-4 p-3 rounded-xl bg-slate-800/20 border border-white/5 relative overflow-hidden group hover:bg-slate-800/40 transition-all">
              <div className={`absolute top-0 left-0 w-1 h-full ${bar}`} />

              <div className="flex flex-col gap-1 pl-1 w-full">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${label}`}>
                    {a.level} Priority
                  </span>

                  {a.time && (
                    <span className="text-[10px] text-slate-600 font-medium flex-shrink-0">
                      🕐 {a.time}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-tight group-hover:text-slate-100 transition-colors">
                  {a.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-5 border-t border-white/5">
        <button
          onClick={() => navigate('/dashboard/alerts')}
          className="w-full py-2.5 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10 transition-all cursor-pointer"
        >
          View All Alerts →
        </button>
      </div>

    </div>
  );
};

export default AlertsPreviewPanel;
