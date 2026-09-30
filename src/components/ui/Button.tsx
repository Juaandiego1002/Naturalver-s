import { cn } from '@/lib/utils';

export function Button({ variant = 'default', size = 'default', className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary' | 'accent' | 'destructive'; size?: 'default' | 'sm' | 'lg' | 'icon' }) {
  const variants = {
    default: 'bg-brand-dark text-white hover:bg-brand-dark/90 shadow-sm hover:shadow-md',
    outline: 'border-2 border-brand-dark text-brand-dark bg-transparent hover:bg-brand-dark/5',
    ghost: 'text-brand-dark hover:bg-brand-dark/5',
    link: 'text-brand-dark underline-offset-4 hover:underline',
    secondary: 'bg-brand-navy text-white hover:bg-brand-navy/90',
    accent: 'bg-brand-sky text-white hover:bg-brand-sky/90',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizes = {
    default: 'h-11 px-5 py-2.5',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-13 rounded-lg px-8 py-3 text-base',
    icon: 'h-11 w-11',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}