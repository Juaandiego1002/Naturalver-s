import { cn } from '@/lib/utils';

export function Slider({ value, min = 0, max = 100, step = 1, label, className }: { value: number; min?: number; max?: number; step?: number; label?: string; className?: string }) {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn('w-full', className)}>
      {label && <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div className="absolute h-full rounded-full bg-brand-dark" style={{ width: `${percentage}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}