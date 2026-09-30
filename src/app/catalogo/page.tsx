'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CategoryFilter } from '@/components/catalog/category-filter';
import { ProductSort } from '@/components/catalog/product-sort';
import { Pagination } from '@/components/ui/Pagination';
import { Section } from '@/components/ui/Section';
import { SearchBar } from '@/components/ui/SearchBar';
import { mockProducts, mockCategories, getMockProducts } from '@/lib/mock-data';

const PRODUCTS_PER_PAGE = 12;

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const result = useMemo(() => {
    return getMockProducts(
      PRODUCTS_PER_PAGE,
      currentPage,
      selectedCategory,
      sortBy,
      searchQuery
    );
  }, [currentPage, selectedCategory, sortBy, searchQuery]);

  return (
    <Layout>
      <Section background="gray">
        <Container>
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Catálogo
            </h1>
            <p className="mt-2 text-gray-500">
              Encuentra los productos naturales que mejor se adapten a tus necesidades
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md flex-1">
              <SearchBar onSearch={handleSearch} placeholder="Busca productos..." />
            </div>
            <ProductSort value={sortBy} onChange={handleSortChange} />
          </div>

          <div className="mb-6">
            <CategoryFilter
              categories={mockCategories.map((c) => ({ id: c.id, name: c.name }))}
              active={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {result.docs.length > 0 ? (
            <>
              <ProductGrid>
                {result.docs.map((product: any) => (
                  <Link key={product.id} href={`/${product.slug}`} style={{ display: 'contents' }}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </ProductGrid>
              {result.totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    total={result.totalDocs}
                    page={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No se encontraron productos para &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
                className="mt-4 text-sm font-medium text-brand-dark hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  );
}