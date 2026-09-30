import { cn } from '@/lib/utils';

export function AspectRatio({ ratio = '1:1', children, className }: { ratio?: '1:1' | '4:3' | '16:9'; children: React.ReactNode; className?: string }) {
  const ratioClass = ratio === '16:9' ? 'aspect-[16/9]' : ratio === '4:3' ? 'aspect-[4/3]' : 'aspect-square';
  return <div className={cn(ratioClass, 'relative', className)}>{children}</div>;
}