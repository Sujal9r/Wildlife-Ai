export function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function getSeverityClasses(severity) {
  if (severity === 'High') {
    return 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30';
  }

  if (severity === 'Medium') {
    return 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-300/30';
  }

  return 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-300/30';
}

export function getStatusClasses(status) {
  const key = String(status).toLowerCase();

  if (key.includes('respond') || key.includes('high')) {
    return 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30';
  }

  if (key.includes('transit') || key.includes('medium') || key.includes('watch')) {
    return 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-300/30';
  }

  return 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-300/30';
}
