'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function Pagination({ total, page, pageSize = 12 }: { total: number; page: number; pageSize?: number }) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (i === page - 2 || i === page + 2) {
      pages.push(-1);
    }
  }

  const buildUrl = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Link
        href={buildUrl(page - 1)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500',
          page === 1 && 'opacity-50 pointer-events-none'
        )}
        aria-label="Página anterior"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
      {pages.map((p, i) =>
        p === -1 ? (
          <span key={i} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={buildUrl(p)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium',
              p === page
                ? 'border-brand-dark bg-brand-dark text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            )}
          >
            {p}
          </Link>
        )
      )}
      <Link
        href={buildUrl(page + 1)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500',
          page === totalPages && 'opacity-50 pointer-events-none'
        )}
        aria-label="Página siguiente"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}