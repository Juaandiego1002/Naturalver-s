import { cn } from '@/lib/utils';

export function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg">
      {children}
    </div>
  );
}