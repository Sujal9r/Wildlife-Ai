import { motion } from 'framer-motion';
import { formatNumber } from '../utils/formatters';

const toneMap = {
  emerald: 'from-emerald-400/20 to-emerald-500/5 text-emerald-200',
  amber: 'from-amber-400/20 to-amber-500/5 text-amber-100',
  rose: 'from-rose-400/20 to-rose-500/5 text-rose-200',
  cyan: 'from-cyan-400/20 to-cyan-500/5 text-cyan-100',
  violet: 'from-violet-400/20 to-violet-500/5 text-violet-100',
  lime: 'from-lime-300/20 to-lime-500/5 text-lime-100',
};

export function StatCard({ item, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="metric-card"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${toneMap[item.tone] || toneMap.emerald} opacity-60`} />
      <div className="relative space-y-4">
        <p className="text-sm text-white/65">{item.label}</p>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            {formatNumber(item.value)}
          </h3>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
            {item.change}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
