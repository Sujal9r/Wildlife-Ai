import { motion } from 'framer-motion';
import { Map, ShieldCheck, Users } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { StatusBadge } from './StatusBadge';

export function ZoneCard({ zone, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="surface-panel p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">{zone.state}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-white">{zone.name}</h3>
        </div>
        <StatusBadge value={zone.riskLevel} variant="severity" />
      </div>

      <p className="mt-4 text-sm text-white/65">{zone.status}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="data-card">
          <Map className="mb-3 h-4 w-4 text-cyan-300" />
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">Area</p>
          <p className="mt-2 text-sm font-semibold text-white">{zone.area}</p>
        </div>
        <div className="data-card">
          <Users className="mb-3 h-4 w-4 text-amber-300" />
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">Assigned Officers</p>
          <p className="mt-2 text-sm font-semibold text-white">{zone.assignedOfficers}</p>
        </div>
        <div className="data-card">
          <ShieldCheck className="mb-3 h-4 w-4 text-emerald-300" />
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">Status</p>
          <p className="mt-2 text-sm font-semibold text-white">{zone.status}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-white/55">Conservation Progress</span>
          <span className="font-semibold text-white">{zone.progress}%</span>
        </div>
        <ProgressBar value={zone.progress} />
      </div>
    </motion.article>
  );
}
