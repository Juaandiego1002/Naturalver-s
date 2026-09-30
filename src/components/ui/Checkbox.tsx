import { cn } from '@/lib/utils';

export function Checkbox({ checked, onCheckedChange, label, className }: { checked: boolean; onCheckedChange: (checked: boolean) => void; label?: string; className?: string }) {
  return (
    <label className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
          checked ? 'border-brand-dark bg-brand-dark' : 'border-gray-300 bg-white'
        )}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}