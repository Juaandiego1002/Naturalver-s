import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-dark to-brand-light">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.5c-3.58 0-6.5-2.92-6.5-6.5S7.42 6.5 11 6.5v1.5c-2.76 0-5 2.24-5 5s2.24 5 5 5v1.5zm3-4.5l4.5-4.5L21 11l-5 5-3-3z" />
                </svg>
              </div>
              <span className="text-xl font-heading font-bold text-brand-dark">
                NATURALVER'S
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Por un mundo mejor. Productos naturales para tu bienestar.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-heading font-semibold text-gray-900">Catálogo</h3>
            <ul className="space-y-2">
              <li><Link href="/catalogo" className="text-sm text-gray-500 hover:text-brand-dark">Todos los productos</Link></li>
              <li><Link href="/catalogo" className="text-sm text-gray-500 hover:text-brand-dark">Suplementos</Link></li>
              <li><Link href="/catalogo" className="text-sm text-gray-500 hover:text-brand-dark">Cosmética</Link></li>
              <li><Link href="/catalogo" className="text-sm text-gray-500 hover:text-brand-dark">Alimentos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-heading font-semibold text-gray-900">Empresa</h3>
            <ul className="space-y-2">
              <li><Link href="/nosotros" className="text-sm text-gray-500 hover:text-brand-dark">Nosotros</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-brand-dark">Blog</Link></li>
              <li><Link href="/contacto" className="text-sm text-gray-500 hover:text-brand-dark">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-heading font-semibold text-gray-900">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.89 1.27l.83 2.07a2 2 0 01-.45 2.11l-1.5 1.5a11.04 11.04 0 005.5 5.5l1.5-1.5a2 2 0 012.11-.45l2.07.83a2 2 0 011.27 1.89V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 5z" /></svg>
                310 6198912
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l8-5 8 5-8 5-8-5z" /></svg>
                info@naturalvers.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NATURALVER'S. Por un mundo mejor.
          </p>
        </div>
      </div>
    </footer>
  );
}