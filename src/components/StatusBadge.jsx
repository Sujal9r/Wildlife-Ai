import { cn } from '../utils/cn';
import { getSeverityClasses, getStatusClasses } from '../utils/formatters';

export function StatusBadge({ value, variant = 'status' }) {
  const palette = variant === 'severity' ? getSeverityClasses(value) : getStatusClasses(value);

  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', palette)}>
      {value}
    </span>
  );
}
