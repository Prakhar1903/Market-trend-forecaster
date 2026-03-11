import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// REMOVE AppNavbar import - EMBED navbar directly

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Topbar */}
      <header className="h-16 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="text-xl font-bold text-gradient">MarketForecaster <span className="text-slate-500 text-sm font-normal ml-2">v0.1</span></div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
            aria-label="Profile"
            onClick={() => navigate("/profile")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900/30 border-r border-white/10 p-6 flex flex-col gap-2 overflow-y-auto">
          {[
            { id: '', label: 'Overview', icon: '📊', path: '/dashboard' },
            { id: 'brands', label: 'Brand Comparison', icon: '⚖️', path: '/dashboard/brands' },
            { id: 'alerts', label: 'Alerts', icon: '🔔', path: '/dashboard/alerts' },
            { id: 'reports', label: 'Reports', icon: '📋', path: '/dashboard/reports' },
            { id: 'chatbot', label: 'AI Chatbot', icon: '🤖', path: '/dashboard/chatbot' },
          ].map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${isActive
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(56,189,248,0.1)]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
                  }`}
                onClick={() => navigate(item.path)}
              >
                <span className={`text-lg transition-transform group-hover:scale-120 ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,#1e293b,transparent)]">
          <div className="p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
