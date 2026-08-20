import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import CatalogShell from './CatalogShell';
import { Suspense } from 'react';

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export const metadata: Metadata = {
  title: 'Catálogo de Velas Artesanales y Cosmética Natural | Sandra Gil',
  description:
    'Explora nuestra colección de velas aromáticas de cera de soya, jabones botánicos y piezas decorativas hechas a mano en Bogotá, Colombia. Envío rápido.',
  alternates: {
    canonical: 'https://sgvelas.com/catalogo',
  },
  openGraph: {
    title: 'Catálogo Completo | Sandra Gil Velas Artesanales',
    description:
      'Velas artesanales con esencias exclusivas, flores preservadas y cera de soya 100% natural.',
    url: 'https://sgvelas.com/catalogo',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
  },
};

export default async function CatalogPage() {
  // Fetch active products from database
  const products = await prisma.producto.findMany({
    where: {
      activo: true,
    },
    orderBy: {
      nombre: 'asc',
    },
  });

  return (
    <Suspense>
      <CatalogShell products={products} />
    </Suspense>
  );
}
