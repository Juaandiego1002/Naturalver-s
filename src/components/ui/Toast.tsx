import { cn } from '@/lib/utils';

export function Toast({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-white shadow-lg', className)}>
      {children}
    </div>
  );
}