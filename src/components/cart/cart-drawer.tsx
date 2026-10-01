import { useState } from 'react';
import Link from 'next/link';
import { CartItem } from './cart-item';
import { CartSummary } from './cart-summary';
import { Button } from '../ui/Button';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [items, setItems] = useState([
    { id: '1', name: 'Suplemento Natural', price: 85000, image: '/placeholder-product.jpg', quantity: 2, maxStock: 5 },
    { id: '2', name: 'Crema Facial', price: 65000, image: '/placeholder-product.jpg', quantity: 1, maxStock: 3 },
  ]);

  const handleRemove = (id: string) => setItems(items.filter(i => i.id !== id));
  const handleUpdate = (id: string, qty: number) => setItems(items.map(i => i.id === id ? { ...i, quantity: qty } : i));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 100000 ? 0 : 15000;
  const total = subtotal + shipping;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="font-heading text-lg font-semibold">Tu carrito</h2>
          <button onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="mb-4 h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.29 2.29c-.63.63-.17 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <p className="text-gray-500">Tu carrito está vacío</p>
              <Link href="/catalogo" className="mt-2 text-sm font-medium text-brand-dark hover:underline">
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} onRemove={handleRemove} onUpdate={handleUpdate} />
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4">
            <CartSummary subtotal={subtotal} shipping={shipping} total={total}>
              <Button className="w-full">Proceder al pago</Button>
            </CartSummary>
          </div>
        )}
      </div>
    </div>
  );
}