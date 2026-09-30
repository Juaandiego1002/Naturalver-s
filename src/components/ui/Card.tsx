import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md', className)}>
      {children}
    </div>
  );
}