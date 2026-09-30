import { Metadata } from 'next';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Pago - NATURALVER\'S',
};

export default function PagoPage() {
  return (
    <Layout>
      <section className="py-12">
        <Container>
          <h1 className="font-heading text-3xl font-bold text-gray-900">Pago</h1>
          <div className="mt-8 rounded-xl bg-white p-8 shadow-sm text-center">
            <p className="text-gray-500">Forma de pago no disponible.</p>
          </div>
        </Container>
      </section>
    </Layout>
  );
}