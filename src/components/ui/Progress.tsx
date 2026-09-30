import { cn } from '@/lib/utils';

export function Progress({ value, max = 100, className }: { value: number; max?: number; className?: string }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-gray-200', className)}>
      <div
        className="h-full bg-brand-dark transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}