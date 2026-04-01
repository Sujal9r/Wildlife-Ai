import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { RangerCard } from '../components/RangerCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { patrolLogs, rangers } from '../data/mockData';
import { matchesSearch } from '../utils/search';

const columns = [
  { key: 'name', label: 'Ranger' },
  { key: 'zone', label: 'Assigned Zone' },
  { key: 'status', label: 'Patrol Status', render: (value) => <StatusBadge value={value} /> },
  { key: 'shift', label: 'Shift Timing' },
  { key: 'lastActivity', label: 'Last Activity' },
];

export function RangersPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const filteredRangers = useMemo(
    () =>
      rangers.filter((ranger) =>
        matchesSearch(searchQuery, [ranger.id, ranger.name, ranger.zone, ranger.status, ranger.shift, ranger.lastActivity])
      ),
    [searchQuery]
  );
  const filteredPatrolLogs = useMemo(
    () => patrolLogs.filter((log) => matchesSearch(searchQuery, [log.time, log.ranger, log.event, log.zone])),
    [searchQuery]
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Rangers / Patrol Team"
        title="Patrol readiness, shift tracking, and field activity visibility"
        description={
          searchQuery
            ? `Showing ranger and patrol matches for "${searchQuery}".`
            : 'This page demonstrates how patrol teams can be monitored with clean operational cards and tables that surface deployment status, area coverage, and recent mission updates.'
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredRangers.map((ranger, index) => (
          <RangerCard key={ranger.id} ranger={ranger} index={index} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="space-y-6">
          <div className="surface-panel p-4 sm:p-5 md:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">Ranger operations table</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                  Frontline patrol assignments, shifts, and recent activity snapshots in a cleaner mobile-first layout.
                </p>
              </div>
              <div className="inline-flex items-center rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                {filteredRangers.length} active records
              </div>
            </div>
            <div className="mt-5">
              <DataTable columns={columns} rows={filteredRangers} />
            </div>
          </div>
        </div>

        <div className="surface-panel p-4 sm:p-5 md:p-6">
          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">Patrol logs</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">Mock shift log showing how ranger activity can be traced throughout the day.</p>
          <div className="mt-5 space-y-3">
            {filteredPatrolLogs.map((log) => (
              <article
                key={`${log.time}-${log.ranger}`}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-white">{log.ranger}</p>
                    <p className="mt-1 text-sm text-white/55">{log.zone}</p>
                  </div>
                  <span className="w-fit rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/70">{log.time}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">{log.event}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
