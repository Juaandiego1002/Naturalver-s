import { cn } from '@/lib/utils';

export function QuantitySelector({ value, max, onChange, size = 'md' }: { value: number; max: number; onChange: (v: number) => void; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'h-7 w-7 text-sm' : size === 'md' ? 'h-9 w-9 text-sm' : 'h-11 w-11 text-base';
  return (
    <div className="flex items-center rounded-lg border border-gray-300">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className={cn('flex items-center justify-center text-gray-600 hover:bg-gray-100', sizeClass)}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
      </button>
      <span className={cn('min-w-[2ch] text-center font-medium text-gray-900', size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg')}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn('flex items-center justify-center text-gray-600 disabled:opacity-50 hover:bg-gray-100', sizeClass)}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}