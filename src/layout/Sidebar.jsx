import { Leaf, LogOut, Sparkles } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { appMeta } from '../data/mockData';
import { navigationItems } from '../utils/navigation';
import { cn } from '../utils/cn';

const SESSION_KEY = 'forestra_session';

export function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    onClose?.();
    navigate('/login');
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[300px] flex-col border-r border-white/10 bg-forest-950/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-0 md:z-0 md:h-screen md:w-[290px] md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="glass-panel p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-moss/90 to-emerald-400/70 text-forest-950 shadow-lg">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-white">{appMeta.name}</p>
              <p className="text-sm text-white/55">Wildlife protection intelligence</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
            <div className="mb-2 flex items-center gap-2 text-moss">
              <Sparkles className="h-4 w-4" />
              Startup-grade conservation UI
            </div>
            Frontend-only monitoring experience powered by mock intelligence layers.
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-thin">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'border-moss/20 bg-moss/10 text-white'
                      : 'border-transparent bg-white/[0.03] text-white/65 hover:border-white/10 hover:bg-white/[0.06] hover:text-white'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
          <div className="glass-panel p-4 text-sm text-white/65">
            <p className="font-semibold text-white">Mission focus</p>
            <p className="mt-2">Track wildlife, detect threats, and coordinate forest response with elegant visual clarity.</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-rose-400/15 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/15"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
