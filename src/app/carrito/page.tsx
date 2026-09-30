import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Carrito - NATURALVER\'S',
};

export default function CarritoPage() {
  return (
    <Layout>
      <section className="py-12">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-gray-900">Tu carrito</h1>
          <div className="mt-8 rounded-xl bg-white p-8 shadow-sm text-center">
            <p className="text-gray-500">Tu carrito está vacío.</p>
            <a href="/catalogo" className="mt-4 inline-block rounded-lg bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark/90">
              Volver al catálogo
            </a>
          </div>
        </Container>
      </section>
    </Layout>
  );
}