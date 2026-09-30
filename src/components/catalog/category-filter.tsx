import { cn } from '@/lib/utils';

export function CategoryFilter({ categories, active, onChange }: { categories: { id: string; name: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          active === '' ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            active === cat.id ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}