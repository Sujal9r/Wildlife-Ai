import {
  LayoutDashboard,
  PawPrint,
  Siren,
  ShieldCheck,
  Users,
  BarChart3,
} from 'lucide-react';

export const navigationItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Wildlife Monitoring', path: '/wildlife-monitoring', icon: PawPrint },
  { label: 'Forest Alerts', path: '/forest-alerts', icon: Siren },
  { label: 'Protected Areas', path: '/protected-areas', icon: ShieldCheck },
  { label: 'Rangers / Patrol Team', path: '/rangers', icon: Users },
  { label: 'Reports / Analytics', path: '/reports-analytics', icon: BarChart3 },
];
