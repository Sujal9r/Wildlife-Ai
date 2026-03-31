import { DataTable } from '../components/DataTable';
import { RangerCard } from '../components/RangerCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { patrolLogs, rangers } from '../data/mockData';

const columns = [
  { key: 'name', label: 'Ranger' },
  { key: 'zone', label: 'Assigned Zone' },
  { key: 'status', label: 'Patrol Status', render: (value) => <StatusBadge value={value} /> },
  { key: 'shift', label: 'Shift Timing' },
  { key: 'lastActivity', label: 'Last Activity' },
];

export function RangersPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Rangers / Patrol Team"
        title="Patrol readiness, shift tracking, and field activity visibility"
        description="This page demonstrates how patrol teams can be monitored with clean operational cards and tables that surface deployment status, area coverage, and recent mission updates."
      />

      <section className="grid gap-4 xl:grid-cols-3">
        {rangers.map((ranger, index) => (
          <RangerCard key={ranger.id} ranger={ranger} index={index} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="space-y-6">
          <div className="surface-panel p-5 md:p-6">
            <h3 className="font-display text-2xl font-semibold text-white">Ranger operations table</h3>
            <p className="mt-2 text-sm text-white/55">Frontline patrol assignments, shifts, and recent activity snapshots.</p>
            <div className="mt-5">
              <DataTable columns={columns} rows={rangers} />
            </div>
          </div>
        </div>

        <div className="surface-panel p-5 md:p-6">
          <h3 className="font-display text-2xl font-semibold text-white">Patrol logs</h3>
          <p className="mt-2 text-sm text-white/55">Mock shift log showing how ranger activity can be traced throughout the day.</p>
          <div className="mt-5 space-y-3">
            {patrolLogs.map((log) => (
              <article key={`${log.time}-${log.ranger}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{log.ranger}</p>
                    <p className="mt-1 text-sm text-white/55">{log.zone}</p>
                  </div>
                  <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/70">{log.time}</span>
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
