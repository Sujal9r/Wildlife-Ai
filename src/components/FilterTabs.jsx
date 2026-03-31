import { cn } from '../utils/cn';

export function FilterTabs({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            'rounded-full border px-4 py-2 text-sm font-medium transition',
            active === option
              ? 'border-moss/30 bg-moss/15 text-moss'
              : 'border-white/10 bg-white/[0.04] text-white/65 hover:border-white/20 hover:bg-white/[0.07]'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
