import { cn } from '@/lib/utils';

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('text-xl font-heading font-semibold', className)}>{children}</h2>;
}