import {
  alerts,
  protectedZones,
  rangers,
  reportsOverview,
  wildlifeSpecies,
} from '../data/mockData';
import { navigationItems } from './navigation';

export function normalizeSearchValue(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim();
}

export function matchesSearch(query, values) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return true;
  }

  return values.some((value) => normalizeSearchValue(value).includes(normalizedQuery));
}

export function getSearchResults(query) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return [];
  }

  const pageResults = navigationItems.map((item) => ({
    id: `nav-${item.path}`,
    title: item.label,
    detail: 'Open page',
    path: item.path,
    category: 'Pages',
  }));

  const wildlifeResults = wildlifeSpecies.map((species) => ({
    id: `species-${species.id}`,
    title: species.name,
    detail: species.zone,
    path: `/wildlife-monitoring?search=${encodeURIComponent(species.name)}`,
    category: 'Species',
  }));

  const alertResults = alerts.map((alert) => ({
    id: `alert-${alert.id}`,
    title: alert.title,
    detail: `${alert.type} · ${alert.location}`,
    path: `/forest-alerts?search=${encodeURIComponent(alert.title)}`,
    category: 'Alerts',
  }));

  const zoneResults = protectedZones.map((zone) => ({
    id: `zone-${zone.id}`,
    title: zone.name,
    detail: `${zone.state} · ${zone.focus}`,
    path: `/protected-areas?search=${encodeURIComponent(zone.name)}`,
    category: 'Protected Areas',
  }));

  const rangerResults = rangers.map((ranger) => ({
    id: `ranger-${ranger.id}`,
    title: ranger.name,
    detail: `${ranger.zone} · ${ranger.status}`,
    path: `/rangers?search=${encodeURIComponent(ranger.name)}`,
    category: 'Rangers',
  }));

  const reportResults = reportsOverview.map((report) => ({
    id: `report-${report.month}`,
    title: `${report.month} analytics`,
    detail: `${report.wildlifeCount} wildlife count · ${report.alerts} alerts`,
    path: `/reports-analytics?search=${encodeURIComponent(report.month)}`,
    category: 'Reports',
  }));

  return [...pageResults, ...wildlifeResults, ...alertResults, ...zoneResults, ...rangerResults, ...reportResults]
    .filter((item) => matchesSearch(normalizedQuery, [item.title, item.detail, item.category]))
    .slice(0, 8);
}
