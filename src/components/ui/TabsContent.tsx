import { cn } from '@/lib/utils';

export function TabsContent({ value, active, children }: { value: string; active: string; children: React.ReactNode }) {
  if (value !== active) return null;
  return <div className="mt-4">{children}</div>;
}