import { cn } from '@/lib/utils';

export function Tabs({ tabs, active, onChange }: { tabs: { label: string; value: string }[]; active: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'px-4 py-2.5 text-sm font-medium transition-colors',
            active === tab.value
              ? 'border-b-2 border-brand-dark text-brand-dark'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}