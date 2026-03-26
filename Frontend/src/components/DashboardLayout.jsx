import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { MessageSquare, BarChart3, ChevronRight } from 'lucide-react';
import { getProfile } from '../services/authService';

const getAILabel = (pathname) => {
  if (pathname.includes("reports")) return "Ask AI about reports";
  if (pathname.includes("explorer")) return "Analyze sentiment";
  if (pathname.includes("brands")) return "Compare brands";
  return "Ask AI";
};

// ── Sidebar nav items ──────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: '', label: 'Overview', icon: '📊', path: '/dashboard' },
  { id: 'brands', label: 'Brand Comparison', icon: '⚖️', path: '/dashboard/brands' },
  { id: 'explorer', label: 'Sentiment Explorer', icon: '🔍', path: '/dashboard/explorer' },
  { id: 'alerts', label: 'Alerts', icon: '🔔', path: '/dashboard/alerts' },
  { id: 'reports', label: 'Reports', icon: '📋', path: '/dashboard/reports' },
  { id: 'chatbot', label: 'AI Chatbot', icon: '🤖', path: '/dashboard/chatbot' },
  { id: 'forecast', label: 'Forecast', icon: '🔮', path: '/dashboard/forecast' },
];

// ── Page meta derived from current path ───────────────────────────────────
const PAGE_META = {
  '/dashboard': { title: 'Market Overview', subtitle: 'AI-powered sentiment analysis across all products' },
  '/dashboard/brands': { title: 'Brand Comparison', subtitle: 'Side-by-side competitive sentiment analysis' },
  '/dashboard/explorer': { title: 'Sentiment Explorer', subtitle: 'Deep-dive into individual reviews and signals' },
  '/dashboard/alerts': { title: 'Alerts', subtitle: 'AI-detected anomalies and market signals' },
  '/dashboard/reports': { title: 'Reports', subtitle: 'Export and schedule AI-generated reports' },
  '/dashboard/chatbot': { title: 'AI Chatbot', subtitle: 'Ask market questions in natural language' },
  '/dashboard/forecast': { title: 'Market Forecast', subtitle: 'AI-powered sentiment predictions & brand intelligence' },
  '/dashboard/profile': { title: 'Your Profile', subtitle: 'Manage your account and preferences' },
};

// ── Helper: format current time ────────────────────────────────────────────
function useLastUpdated() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── DashboardLayout ────────────────────────────────────────────────────────
const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastUpdated = useLastUpdated();
  const [profile, setProfile] = useState(null);
  const meta = PAGE_META[location.pathname] || { title: 'Dashboard', subtitle: '' };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile in layout", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-slate-950 flex flex-col">

      {/* ── Top Header ──────────────────────────────────────────────────── */}
      <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-slate-900/70 backdrop-blur-xl border-b border-white/10 z-40">

        {/* Left — brand + page title */}
        <div className="flex items-center gap-6">
          {/* Logo / brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(56,189,248,0.4)]">
              <BarChart3 className="text-primary w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase italic hidden sm:block">
              Market AI
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 hidden md:block" />

          {/* Page title breadcrumb */}
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-bold text-slate-200 leading-tight">{meta.title}</span>
            <span className="text-[10px] text-slate-500 leading-tight">{meta.subtitle}</span>
          </div>
        </div>

        {/* Right — live indicator + last updated + profile */}
        <div className="flex items-center gap-4">

          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Live</span>
          </div>

          {/* Last updated */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-500">
            <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            Updated {lastUpdated}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* Profile button */}
          <button
            type="button"
            onClick={() => navigate('/dashboard/profile')}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border overflow-hidden ${location.pathname === '/dashboard/profile'
              ? 'bg-primary/20 border-primary/40 text-primary'
              : 'bg-slate-800 border-white/10 text-slate-400 hover:text-primary hover:border-primary/50'
              }`}
            aria-label="Profile"
          >
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Body (sidebar + content) ─────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-64 shrink-0 bg-slate-900/50 backdrop-blur-md border-r border-white/10 p-4 flex flex-col gap-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group cursor-pointer text-left w-full overflow-hidden ${isActive
                  ? 'text-white border border-primary/30 shadow-[0_0_20px_rgba(56,189,248,0.15)] bg-slate-800/50'
                  : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border border-transparent'
                  }`}
                onClick={() => navigate(item.path)}
              >
                {/* Holographic Active Indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50 pointer-events-none" />
                )}
                
                <span className={`text-lg transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''} relative z-10`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm truncate uppercase tracking-wider relative z-10">{item.label}</span>
                
                {/* Right Chevron for Active State */}
                {isActive && (
                  <ChevronRight className="ml-auto w-4 h-4 text-primary relative z-10 opacity-70" />
                )}
              </button>
            );
          })}

          {/* Sidebar footer — version badge */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Market AI</p>
              <p className="text-[10px] text-primary mt-1 font-mono bg-primary/10 px-2 py-0.5 rounded-full">v1.0.0-PRO</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,#1e293b,transparent)]">
          <div className="p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ── Floating AI FAB ──────────────────────────────────── */}
      {location.pathname !== '/dashboard/chatbot' && (
        <div className="group fixed bottom-8 right-8 z-50">
          {/* Intense Glow Atmosphere */}
          <div className="absolute inset-0 rounded-full bg-primary/50 blur-[30px] opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-700 scale-150"></div>
          
          <div className="absolute inset-0 rounded-full bg-secondary/50 blur-[20px] opacity-50 group-hover:opacity-100 animate-pulse transition-opacity duration-500 delay-150"></div>

          {/* Tooltip */}
          <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-xl border border-primary/30 text-slate-200 text-xs font-bold tracking-widest uppercase px-4 py-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            Open Intelligence Layer
          </div>

          <button
            onClick={() => navigate("/dashboard/chatbot")}
            className="relative flex items-center gap-3 px-6 py-4 rounded-full bg-linear-to-r from-primary to-secondary text-white font-black text-sm shadow-[0_8px_32px_rgba(56,189,248,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-white/30 backdrop-blur-md"
          >
            {/* Inner shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <span className="text-xl relative z-10">⚡</span>
            <span className="relative z-10">{getAILabel(location.pathname)}</span>

            {/* Notification Indicator Loop */}
            <span className="absolute top-2 right-3 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_12px_#10b981]">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
