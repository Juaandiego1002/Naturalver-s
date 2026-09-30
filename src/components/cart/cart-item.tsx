import { cn } from '@/lib/utils';

export function CartItem({ item, onRemove, onUpdate }: { item: { id: string; name: string; price: number; image: string; quantity: number; maxStock: number }; onRemove: (id: string) => void; onUpdate: (id: string, qty: number) => void }) {
  return (
    <div className="flex gap-4 py-4">
      <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
      <div className="flex flex-1 flex-col">
        <h4 className="font-heading font-medium text-gray-900">{item.name}</h4>
        <p className="text-sm font-bold text-brand-dark">{formatPrice(item.price)}</p>
        <div className="mt-auto flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
            <span className="px-3 py-1 text-sm font-medium text-gray-900">{item.quantity}</span>
            <button onClick={() => onUpdate(item.id, item.quantity + 1)} disabled={item.quantity >= item.maxStock} className="px-3 py-1 text-gray-600 disabled:opacity-50 hover:bg-gray-100">+</button>
          </div>
          <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 hover:underline">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}