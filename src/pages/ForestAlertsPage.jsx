import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { FilterTabs } from '../components/FilterTabs';
import { PanelCard } from '../components/PanelCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { alertTypes, alerts } from '../data/mockData';
import { matchesSearch } from '../utils/search';

const columns = [
  { key: 'id', label: 'Alert ID' },
  { key: 'title', label: 'Alert Title' },
  { key: 'type', label: 'Type' },
  { key: 'severity', label: 'Severity', render: (value) => <StatusBadge value={value} variant="severity" /> },
  { key: 'source', label: 'Source' },
  { key: 'status', label: 'Status', render: (value) => <StatusBadge value={value} /> },
];

export function ForestAlertsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const filteredAlerts = useMemo(() => {
    const alertsByType = activeFilter === 'All' ? alerts : alerts.filter((alert) => alert.type === activeFilter);

    return alertsByType.filter((alert) =>
      matchesSearch(searchQuery, [alert.id, alert.title, alert.type, alert.severity, alert.location, alert.timestamp, alert.source, alert.status])
    );
  }, [activeFilter, searchQuery]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Alert Intelligence"
        title="Forest fire, logging, poaching, and village-edge risk detection"
        description="Modern wildlife and forest protection depends on quick understanding of what happened, where it happened, how severe it is, and which team should act first."
        action={<FilterTabs options={alertTypes} active={activeFilter} onChange={setActiveFilter} />}
      />

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {filteredAlerts.slice(0, 4).map((alert) => (
          <article key={alert.id} className="surface-panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">{alert.type}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{alert.title}</h3>
              </div>
              <StatusBadge value={alert.severity} variant="severity" />
            </div>
            <div className="mt-5 space-y-2 text-sm text-white/65">
              <p>Location: {alert.location}</p>
              <p>Time: {alert.timestamp}</p>
              <p>Source: {alert.source}</p>
            </div>
          </article>
        ))}
      </section>

      <PanelCard
        title="Alert operations table"
        subtitle={
          searchQuery
            ? `Showing matches for "${searchQuery}" across alert records and sources.`
            : 'Filterable static mock data for threat review and response planning'
        }
      >
        <DataTable columns={columns} rows={filteredAlerts} />
      </PanelCard>
    </div>
  );
}
