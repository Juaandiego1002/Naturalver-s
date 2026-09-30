import { cn } from '@/lib/utils';

export function SheetFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('border-t border-gray-100 p-4', className)}>{children}</div>;
}