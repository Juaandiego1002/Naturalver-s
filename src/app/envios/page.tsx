import { Metadata } from 'next';
import { queryPageBySlug } from '@/lib/payload';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Envíos - NATURALVER\'S',
};

export default async function EnviosPage() {
  const page = await queryPageBySlug('envios');
  return (
    <Layout>
      <Section>
        <Container>
          <h1 className="font-heading text-4xl font-bold text-gray-900">
            {page?.title || 'Envíos y entregas'}
          </h1>
          <div className="mt-6 text-gray-600">
            {(page as any)?.content || 'Contenido no disponible'}
          </div>
        </Container>
      </Section>
    </Layout>
  );
}