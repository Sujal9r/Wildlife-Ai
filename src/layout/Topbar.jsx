import { Bell, Menu, Search, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { navigationItems } from '../utils/navigation';
import { getSearchResults } from '../utils/search';

export function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const current = navigationItems.find((item) => item.path === location.pathname) || navigationItems[0];
  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('search') ?? '');
  }, [searchParams]);

  const results = useMemo(() => getSearchResults(query), [query]);

  function updateSearch(nextQuery) {
    setQuery(nextQuery);

    const nextParams = new URLSearchParams(searchParams);

    if (nextQuery.trim()) {
      nextParams.set('search', nextQuery);
    } else {
      nextParams.delete('search');
    }

    setSearchParams(nextParams, { replace: true });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (results[0]) {
      navigate(results[0].path);
      setFocused(false);
    }
  }

  function handleResultSelect(path) {
    navigate(path);
    setFocused(false);
  }

  const showResults = focused && query.trim().length > 0;

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
          <div className="relative min-w-[240px] flex-1 sm:flex-none">
            <form onSubmit={handleSubmit}>
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => updateSearch(event.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => window.setTimeout(() => setFocused(false), 120)}
                  placeholder="Search zones, species, alerts..."
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 focus:border-moss/30 focus:outline-none"
                />
              </label>
            </form>

            {showResults ? (
              <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 overflow-hidden rounded-3xl border border-white/10 bg-forest-950/95 shadow-soft backdrop-blur-xl">
                {results.length ? (
                  <div className="divide-y divide-white/10">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onMouseDown={() => handleResultSelect(result.path)}
                        className="flex w-full items-start justify-between gap-4 px-4 py-3 text-left transition hover:bg-white/[0.05]"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{result.title}</p>
                          <p className="mt-1 text-xs text-white/50">{result.detail}</p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                          {result.category}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-5">
                    <p className="text-sm font-semibold text-white">No results found</p>
                    <p className="mt-1 text-xs text-white/50">Try searching by page name, species, alert, ranger, or reserve.</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>

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
