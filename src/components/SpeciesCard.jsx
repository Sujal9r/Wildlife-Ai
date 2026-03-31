import { motion } from 'framer-motion';
import { Activity, MapPinned, Radar, ScanSearch } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

export function SpeciesCard({ species, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="surface-panel p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-white/50">Tracked species</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-white">{species.name}</h3>
        </div>
        <StatusBadge value={species.status} />
      </div>

      <div className="grid gap-3 text-sm text-white/70">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
          <Activity className="h-4 w-4 text-moss" />
          <span>Tracking: {species.tracking}</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
          <MapPinned className="h-4 w-4 text-cyan-300" />
          <span>GPS Zone: {species.zone}</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
          <Radar className="h-4 w-4 text-amber-300" />
          <span>Camera Trap Activity: {species.cameraActivity}</span>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-white/55">Population Health Index</span>
          <span className="font-semibold text-white">{species.health}%</span>
        </div>
        <ProgressBar value={species.health} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-forest-950/50 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
          <ScanSearch className="h-4 w-4 text-moss" />
          Recent movement logs
        </div>
        <ul className="space-y-2 text-sm text-white/65">
          {species.movementLogs.map((log) => (
            <li key={log} className="rounded-xl bg-white/[0.03] px-3 py-2">
              {log}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
