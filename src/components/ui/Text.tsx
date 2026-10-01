import { cn } from '@/lib/utils';

export function Text({ as: Tag = 'p', variant = 'body', className, children }: { as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; variant?: 'body' | 'muted' | 'small' | 'caption' | 'lead'; className?: string; children: React.ReactNode }) {
  const variants = {
    body: 'text-base text-gray-700',
    muted: 'text-base text-gray-500',
    small: 'text-sm text-gray-600',
    caption: 'text-xs text-gray-500',
    lead: 'text-lg text-gray-700',
  };
  const tagStyles = {
    p: '',
    span: '',
    h1: 'text-4xl font-heading font-bold',
    h2: 'text-3xl font-heading font-bold',
    h3: 'text-2xl font-heading font-semibold',
    h4: 'text-xl font-heading font-semibold',
    h5: 'text-lg font-heading font-medium',
    h6: 'text-base font-heading font-medium',
  };
  return (
    <Tag className={cn(variants[variant], tagStyles[Tag], className)}>
      {children}
    </Tag>
  );
}