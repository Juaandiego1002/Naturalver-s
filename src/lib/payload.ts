import { getMockProducts, getMockProductBySlug, getMockCategories } from './mock-data';
import { headers } from 'next/headers';

async function getPayloadApiUrl(): Promise<string> {
  const envUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || '/api';
  if (envUrl.startsWith('http')) return envUrl;

  // In Server Components, construct full URL from headers
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    return `${protocol}://${host}${envUrl}`;
  } catch {
    // Fallback for build time or non-request contexts
    return `http://localhost:3000${envUrl}`;
  }
}

async function payloadFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = await getPayloadApiUrl();
  const res = await fetch(`${baseUrl}${endpoint}`, {
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
  depth?: number;
}) {
  const { where, sort, limit = 12, page = 1, depth = 2 } = params;

  const searchParams = new URLSearchParams();
  if (sort) searchParams.set('sort', sort);
  searchParams.set('limit', String(limit));
  searchParams.set('page', String(page));
  searchParams.set('depth', String(depth));

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

  return payloadFetch<{ docs: any[]; totalDocs: number; totalPages: number; page: number }>(
    `/products?${searchParams.toString()}`
  );
}

export async function queryProductBySlug(slug: string, depth = 2) {
  return payloadFetch<{ docs: any[] }>(
    `/products?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=${depth}`
  ).then((res) => res.docs[0] || null);
}

export async function queryCategories(depth = 0) {
  return payloadFetch<{ docs: any[] }>(
    `/categories?sort=order&limit=100&depth=${depth}`
  ).then((res) => res.docs);
}

export async function queryPageBySlug(slug: string) {
  try {
    return payloadFetch<{ docs: any[] }>(
      `/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
    ).then((res) => res.docs[0] || null);
  } catch {
    return null;
  }
}

export function getImageUrl(image: any): string {
  if (!image) return '/placeholder-product.jpg';
  if (typeof image === 'string') return image;
  return image?.url || '/placeholder-product.jpg';
}