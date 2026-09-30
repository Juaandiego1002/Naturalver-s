import { cn } from '@/lib/utils';

export function SheetHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('border-b border-gray-100 p-4', className)}>{children}</div>;
}