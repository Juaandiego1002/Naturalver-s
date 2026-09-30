// Tipos generados por Payload CMS
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category?: { id: string; name: string };
  images?: { image: { url: string }; alt?: string }[];
  stock: number;
  inStock: boolean;
  features?: string[];
  benefits?: string[];
  ingredients?: string[];
  usage?: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  newArrival: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: { product: string; quantity: number; price: number; name: string }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  meta?: { title?: string; description?: string };
  content?: string;
}