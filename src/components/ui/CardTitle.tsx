import { cn } from '@/lib/utils';

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-heading font-semibold text-gray-900', className)}>{children}</h3>;
}