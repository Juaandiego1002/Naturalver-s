import { PropsWithChildren } from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-dark to-brand-light">
        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.5c-3.58 0-6.5-2.92-6.5-6.5S7.42 6.5 11 6.5v1.5c-2.76 0-5 2.24-5 5s2.24 5 5 5v1.5zm3-4.5l4.5-4.5L21 11l-5 5-3-3z" />
        </svg>
      </div>
      <span className="text-xl font-heading font-bold text-brand-dark">
        NATURALVER'S
      </span>
    </div>
  );
}