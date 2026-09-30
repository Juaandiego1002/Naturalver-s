'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Container } from '../ui/Container';
import { Logo } from './Logo';

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? 'border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/catalogo" className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-dark">
              Catálogo
            </Link>
            <Link href="/nosotros" className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-dark">
              Nosotros
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-dark">
              Blog
            </Link>
            <Link href="/contacto" className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-dark">
              Contacto
            </Link>
          </nav>

          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/busqueda" className="hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 sm:flex">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-brand-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark/90"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.29 2.29c-.63.63-.17 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}