import { cn } from '@/lib/utils';

export function SheetTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('text-lg font-heading font-semibold', className)}>{children}</h2>;
}