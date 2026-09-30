import { cn } from '@/lib/utils';

export function DialogContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl bg-white p-6 shadow-xl', className)}>
      {children}
    </div>
  );
}