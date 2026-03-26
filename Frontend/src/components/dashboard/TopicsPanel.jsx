import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TopicsPanel = ({ topics }) => {
  const navigate = useNavigate();
  return (
    <div className="glass-card p-6 h-full flex flex-col border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 drop-shadow-md">
          <span className="text-xl">🔥</span> Trending Topics
        </h3>
        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">
          Topic share based on total mentions
        </p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {topics.map((t, i) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            key={t.name}
            className="group relative w-full flex flex-col gap-2 bg-slate-900/60 hover:bg-slate-800/90 border border-white/5 hover:border-primary/40 p-3.5 rounded-2xl transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg"
          >
            {/* Name row */}
            <div className="flex items-center justify-between w-full gap-2">
              <span className="text-sm font-bold text-slate-100 group-hover:text-primary transition-colors truncate drop-shadow-sm">
                {t.name}
              </span>
              <span className="text-[10px] font-black text-slate-400 bg-slate-950/80 px-2 py-1 rounded shadow-inner border border-white/5 shrink-0 group-hover:text-primary transition-colors">
                {(t.popularity || 0).toFixed(0)}%
              </span>
            </div>

            {/* Progress + sentiment row */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-2 bg-slate-950/50 rounded-full overflow-hidden shadow-inner border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${t.popularity || 0}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] ${t.sentiment > 0.1 ? 'bg-gradient-to-r from-emerald-500 to-accent shadow-[0_0_10px_#10b981]' : t.sentiment < -0.1 ? 'bg-gradient-to-r from-rose-500 to-red-400 shadow-[0_0_10px_#ef4444]' : 'bg-gradient-to-r from-blue-500 to-primary shadow-[0_0_10px_#38bdf8]'
                    }`}
                />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest shrink-0 ${t.sentiment > 0.1 ? 'text-accent' : t.sentiment < -0.1 ? 'text-red-400' : 'text-primary'
                }`}>
                {t.sentiment > 0.1 ? 'Positive' : t.sentiment < -0.1 ? 'Negative' : 'Neutral'}
              </span>
            </div>

            {/* Hover tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl text-white text-[10px] font-bold py-1.5 px-3 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10 translate-y-2 group-hover:translate-y-0">
              {(t.mentions || 0).toLocaleString()} Mentions
            </div>
            
            {/* Subtle glow border */}
            <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {(!topics || topics.length === 0) && (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-600 gap-2 italic mt-8">
          <div className="text-2xl opacity-20">🏷️</div>
          <span className="text-xs">No topics identified in this segment</span>
        </div>
      )}

      <div className="mt-auto pt-6 border-t border-white/5">
        <button
          onClick={() => navigate('/dashboard/explorer?topic=all')}
          className="w-full py-2.5 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10 transition-all cursor-pointer"
        >
          Explore All Topics →
        </button>
      </div>
    </div>
  );
};

export default TopicsPanel;
