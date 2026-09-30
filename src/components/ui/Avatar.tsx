import { cn } from '@/lib/utils';

export function Avatar({ src, alt, size = 'md', className }: { src: string; alt: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClass = size === 'sm' ? 'h-8 w-8 text-sm' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12';
  return (
    <img
      src={src}
      alt={alt}
      className={cn('rounded-full object-cover', sizeClass, className)}
    />
  );
}