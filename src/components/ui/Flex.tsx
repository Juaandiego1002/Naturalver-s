import { PropsWithChildren } from 'react';

export function Flex({ children, direction = 'row', align = 'center', justify = 'start', gap = 4, className, wrap }: PropsWithChildren & { direction?: 'row' | 'col'; align?: 'start' | 'center' | 'end' | 'stretch'; justify?: 'start' | 'center' | 'end' | 'between' | 'around'; gap?: number; className?: string; wrap?: boolean }) {
  const dir = direction === 'col' ? 'flex-col' : 'flex-row';
  const alignClass = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' }[align];
  const justifyClass = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' }[justify];
  return <div className={`flex ${dir} ${alignClass} ${justifyClass} gap-${gap} ${wrap ? 'flex-wrap' : ''} ${className || ''}`}>{children}</div>;
}