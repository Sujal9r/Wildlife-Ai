import { Bell, Menu, Search, ShieldCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { navigationItems } from '../utils/navigation';

export function Topbar({ onMenuClick }) {
  const location = useLocation();
  const current = navigationItems.find((item) => item.path === location.pathname) || navigationItems[0];

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-forest-950/70 px-4 py-4 backdrop-blur-xl md:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-moss/75">Conservation dashboard</p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-white">{current.label}</h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative min-w-[240px] flex-1 sm:flex-none">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              type="text"
              placeholder="Search zones, species, alerts..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
            />
          </label>

          <div className="flex items-center gap-3">
            <button type="button" className="nav-chip">
              <Bell className="h-4 w-4" />
              12 alerts
            </button>
            <button type="button" className="nav-chip">
              <ShieldCheck className="h-4 w-4" />
              Protected mode
            </button>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-moss to-emerald-400 font-semibold text-forest-950">
                FS
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Forest Supervisor</p>
                <p className="text-xs text-white/45">National command view</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
