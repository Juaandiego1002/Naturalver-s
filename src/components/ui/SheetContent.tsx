import { cn } from '@/lib/utils';

export function SheetContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex h-full flex-col', className)}>{children}</div>;
}