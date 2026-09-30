import { cn } from '@/lib/utils';

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M7 5l6 5-6 5V5z" /></svg>}
          {item.href ? (
            <a href={item.href} className="hover:text-brand-dark hover:underline">{item.label}</a>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}