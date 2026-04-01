import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { PerformanceRadarChart } from '../components/charts/PerformanceRadarChart';
import { ReportsPerformanceChart } from '../components/charts/ReportsPerformanceChart';
import { reportsOverview } from '../data/mockData';
import { matchesSearch } from '../utils/search';

const rows = reportsOverview.map((item) => ({
  id: item.month,
  month: item.month,
  wildlifeCount: item.wildlifeCount,
  alerts: item.alerts,
  patrolCoverage: `${item.patrolCoverage}%`,
  performance: item.performance >= 85 ? 'High' : item.performance >= 78 ? 'Medium' : 'Low',
}));

const columns = [
  { key: 'month', label: 'Month' },
  { key: 'wildlifeCount', label: 'Wildlife Count' },
  { key: 'alerts', label: 'Monthly Alerts' },
  { key: 'patrolCoverage', label: 'Patrol Coverage' },
  { key: 'performance', label: 'Protected Area Performance', render: (value) => <StatusBadge value={value} variant="severity" /> },
];

export function ReportsAnalyticsPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const filteredRows = useMemo(
    () =>
      rows.filter((item) =>
        matchesSearch(searchQuery, [item.id, item.month, item.wildlifeCount, item.alerts, item.patrolCoverage, item.performance])
      ),
    [searchQuery]
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Reports / Analytics"
        title="Wildlife trends, alert volumes, patrol coverage, and zone performance"
        description={
          searchQuery
            ? `Showing report matches for "${searchQuery}".`
            : 'This analytics view combines clean charts and readable tables to show how a conservation team could summarize outcomes and operational performance over time.'
        }
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <ReportsPerformanceChart />
        <PerformanceRadarChart />
      </section>

      <section className="surface-panel p-5 md:p-6">
        <h3 className="font-display text-2xl font-semibold text-white">Analytics summary table</h3>
        <p className="mt-2 text-sm text-white/55">Monthly static datasets for wildlife counts, alerts, patrol coverage, and area performance.</p>
        <div className="mt-5">
          <DataTable columns={columns} rows={filteredRows} />
        </div>
      </section>
    </div>
  );
}
