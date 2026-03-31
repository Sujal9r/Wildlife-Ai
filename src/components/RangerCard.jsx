import { motion } from 'framer-motion';
import { Clock3, MapPinned, RadioTower } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export function RangerCard({ ranger, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="surface-panel p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">{ranger.id}</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-white">{ranger.name}</h3>
        </div>
        <StatusBadge value={ranger.status} />
      </div>

      <div className="mt-5 space-y-3 text-sm text-white/70">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
          <MapPinned className="h-4 w-4 text-cyan-300" />
          <span>{ranger.zone}</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
          <Clock3 className="h-4 w-4 text-amber-300" />
          <span>{ranger.shift}</span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4 py-3">
          <RadioTower className="h-4 w-4 text-emerald-300" />
          <span>{ranger.lastActivity}</span>
        </div>
      </div>
    </motion.article>
  );
}
