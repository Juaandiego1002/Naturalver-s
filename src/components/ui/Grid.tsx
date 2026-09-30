import { PropsWithChildren } from 'react';

export function Grid({ children, cols = 3, className }: PropsWithChildren & { cols?: 1 | 2 | 3 | 4 | 5 | 6; className?: string }) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  }[cols];
  return <div className={`grid gap-6 ${colsClass} ${className || ''}`}>{children}</div>;
}