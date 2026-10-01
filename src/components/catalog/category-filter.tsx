'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function CategoryFilter({ categories, active }: { categories: { id: string; name: string }[]; active: string }) {
  const searchParams = useSearchParams();

  const buildUrl = (categoryId: string) => {
    const params = new URLSearchParams();
    if (categoryId) params.set('category', categoryId);
    // Preserve search and sort
    const currentSearch = searchParams.get('search');
    const currentSort = searchParams.get('sort');
    if (currentSearch) params.set('search', currentSearch);
    if (currentSort) params.set('sort', currentSort);
    return `/catalogo?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildUrl('')}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors',
          active === '' ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        )}
      >
        Todos
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={buildUrl(cat.id)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            active === cat.id ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}