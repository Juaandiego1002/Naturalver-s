import { cn } from '@/lib/utils';

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('mt-1 text-sm text-gray-500', className)}>{children}</p>;
}