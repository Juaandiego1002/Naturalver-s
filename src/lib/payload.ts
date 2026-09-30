// Payload client with automatic fallback to mock data
import { mockProducts, mockCategories } from './mock-data';

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || '/api';
let useMock = false;

async function payloadFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${PAYLOAD_API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status}`);
  }

  return res.json();
}

export async function queryProducts(params: {
  where?: Record<string, unknown>;
  sort?: string;
  limit?: number;
  page?: number;
}) {
  const { where, sort, limit = 12, page = 1 } = params;

  if (useMock) {
    const category = (where?.category as any)?.equals || '';
    const nameQuery = (where?.name as any)?.like || '';
    return getMockProducts(limit, page, category, sort || 'popular', nameQuery);
  }

  try {
    const searchParams = new URLSearchParams();
    if (sort) searchParams.set('sort', sort);
    searchParams.set('limit', String(limit));
    searchParams.set('page', String(page));

    if (where) {
      Object.entries(where).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value as Record<string, unknown>).forEach(([op, val]) => {
            searchParams.set(`where[${key}][${op}]`, String(val));
          });
        } else {
          searchParams.set(`where[${key}]`, String(value));
        }
      });
    }

    const res = await payloadFetch<{ docs: any[]; totalDocs: number; totalPages: number; page: number }>(
      `/products?${searchParams.toString()}`
    );
    return res;
  } catch {
    useMock = true;
    const category = (where?.category as any)?.equals || '';
    const nameQuery = (where?.name as any)?.like || '';
    return getMockProducts(limit, page, category, sort || 'popular', nameQuery);
  }
}

export async function queryProductBySlug(slug: string) {
  if (useMock) return getMockProductBySlug(slug);
  try {
    const res = await payloadFetch<{ docs: any[] }>(
      `/products?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
    );
    return res.docs[0] || null;
  } catch {
    useMock = true;
    return getMockProductBySlug(slug);
  }
}

export async function queryCategories() {
  if (useMock) return getMockCategories();
  try {
    const res = await payloadFetch<{ docs: any[] }>('/categories?sort=order&limit=100');
    return res.docs;
  } catch {
    useMock = true;
    return getMockCategories();
  }
}

export async function queryPageBySlug(slug: string) {
  try {
    const res = await payloadFetch<{ docs: any[] }>(
      `/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
    );
    return res.docs[0] || null;
  } catch {
    return null;
  }
}

export function getImageUrl(image: any): string {
  if (!image) return '/placeholder-product.jpg';
  if (typeof image === 'string') return image;
  return image?.url || '/placeholder-product.jpg';
}

// Re-export mock helpers
import { getMockProducts, getMockProductBySlug, getMockCategories } from './mock-data';