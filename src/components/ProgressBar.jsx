export function ProgressBar({ value }) {
  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-moss via-emerald-400 to-forest-400"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-xs font-medium text-white/55">{value}% conservation progress</p>
    </div>
  );
}
