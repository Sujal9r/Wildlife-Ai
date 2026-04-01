import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { LiveAnimalPanel } from '../components/LiveAnimalPanel';
import { PanelCard } from '../components/PanelCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { FireRiskChart } from '../components/charts/FireRiskChart';
import { PatrolActivityChart } from '../components/charts/PatrolActivityChart';
import { WildlifePopulationChart } from '../components/charts/WildlifePopulationChart';
import { appMeta, dashboardHighlights, forestStats, recentAlertsTable } from '../data/mockData';

const columns = [
  { key: 'id', label: 'Alert ID' },
  { key: 'title', label: 'Alert' },
  { key: 'type', label: 'Type' },
  { key: 'severity', label: 'Severity', render: (value) => <StatusBadge value={value} variant="severity" /> },
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status', render: (value) => <StatusBadge value={value} /> },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="glass-panel overflow-hidden p-5 md:p-8"
      >
        <div className="grid gap-8 xl:grid-cols-[1.35fr,0.8fr]">
          <div>
            <div className="nav-chip mb-4">
              <Sparkles className="h-4 w-4 text-moss" />
              {appMeta.name} Command Center
            </div>
            <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-6xl">
              Protecting Wildlife with Modern Technology
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base md:text-lg md:leading-8">
              {appMeta.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-semibold text-forest-950 transition hover:scale-[1.02]">
                Explore live modules
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08]">
                Review protected zones
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {dashboardHighlights.map((item) => (
              <div key={item.title} className="data-card">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">{item.title}</p>
                <p className="mt-3 font-display text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-7 text-white/60">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {forestStats.map((item, index) => (
          <StatCard key={item.label} item={item} index={index} />
        ))}
      </section>

      <LiveAnimalPanel />

      <section className="grid gap-6 xl:grid-cols-2">
        <WildlifePopulationChart />
        <FireRiskChart />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr,0.9fr]">
        <PanelCard
          title="Recent alerts"
          subtitle="Latest threat, fire, movement, and logging alerts across monitored zones"
          action={
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Live queue
            </div>
          }
        >
          <DataTable columns={columns} rows={recentAlertsTable} />
        </PanelCard>
        <PatrolActivityChart />
      </section>
    </div>
  );
}
