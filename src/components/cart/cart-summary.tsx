import { cn } from '@/lib/utils';

export function CartSummary({ subtotal, shipping, total, children, className }: { subtotal: number; shipping: number; total: number; children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-gray-100 bg-white p-6 shadow-sm', className)}>
      <h3 className="font-heading text-lg font-semibold text-gray-900">Resumen del pedido</h3>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Envío</span>
          <span className="font-medium text-gray-900">{shipping === 0 ? 'Gratuito' : formatPrice(shipping)}</span>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between">
            <span className="font-heading font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-brand-dark">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}