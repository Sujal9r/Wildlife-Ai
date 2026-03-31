import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export function PanelCard({ title, subtitle, children, className, action }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn('surface-panel p-5 md:p-6', className)}
    >
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title ? <h3 className="font-display text-xl font-semibold text-white">{title}</h3> : null}
            {subtitle ? <p className="mt-1 text-sm text-white/55">{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </div>
      )}
      {children}
    </motion.section>
  );
}
