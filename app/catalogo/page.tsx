import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import CatalogShell from './CatalogShell';
import { Suspense } from 'react';

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export const metadata: Metadata = {
  title: 'Catálogo de Velas Aromáticas y Decorativas en Cera de Soya | Sandra Gil',
  description:
    'Explora nuestra colección de velas aromáticas de cera de soya, jabones botánicos y piezas decorativas hechas a mano en Bogotá, Colombia. Envío rápido.',
  alternates: {
    canonical: 'https://sandragilvelas.com/catalogo',
  },
  openGraph: {
    title: 'Catálogo Completo de Velas Artesanales | Sandra Gil',
    description:
      'Velas artesanales con esencias exclusivas, flores botánicas naturales y cera de soya 100% natural vertidas a mano en Bogotá.',
    url: 'https://sandragilvelas.com/catalogo',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Velas Artesanales | Sandra Gil',
    description:
      'Velas de cera de soya pura y flores botánicas hechas a mano en Bogotá. Compra online segura con envíos nacionales.',
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
