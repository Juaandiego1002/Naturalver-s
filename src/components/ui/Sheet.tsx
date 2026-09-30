import { cn } from '@/lib/utils';

export function Sheet({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
        {children}
      </div>
    </div>
  );
}