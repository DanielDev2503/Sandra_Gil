import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import CatalogShell from './CatalogShell';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // SSR en tiempo real: consulta directa a Supabase en cada petición para reflejar cambios instantáneamente

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
      'Velas artesanales con esencias exclusivas, flores artesanales y cera de soya 100% natural vertidas a mano en Bogotá.',
    url: 'https://sandragilvelas.com/catalogo',
    siteName: 'Sandra Gil Velas Artesanales',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Velas Artesanales | Sandra Gil',
    description:
      'Velas de cera de soya pura y flores artesanales hechas a mano en Bogotá. Compra online segura con envíos nacionales.',
  },
};

const BAJO_PEDIDO_SLUGS = [
  'bicicleta-vintage',
  'bouquet-botanico-esculpido',
  'cofre-botanico-esculpido',
  'leon-esculpido-melao',
];

const isBajoPedidoItem = (p: { esBajoPedido?: boolean | null; slug?: string | null }): boolean => {
  if (p.esBajoPedido) return true;
  if (!p.slug) return false;
  return BAJO_PEDIDO_SLUGS.includes(p.slug.toLowerCase().trim());
};

export default async function CatalogPage() {
  // Consulta a base de datos excluyendo piezas bajo pedido directamente desde Prisma
  const rawProducts = await prisma.producto.findMany({
    where: {
      activo: true,
      esBajoPedido: false,
    },
    select: {
      id: true,
      slug: true,
      nombre: true,
      descripcion: true,
      tipo: true,
      aroma: true,
      material: true,
      dimensiones: true,
      precio: true,
      esBajoPedido: true,
      stock: true,
      url_imagen: true,
      imagenes: true,
      activo: true,
      temporada: true,
    },
    orderBy: {
      nombre: 'asc',
    },
  });

  // Doble filtro consistente de seguridad por slug para blindar que ninguna pieza bajo pedido entre al catálogo
  const products = rawProducts.filter((p) => !isBajoPedidoItem(p));

  return (
    <Suspense>
      <CatalogShell products={products} />
    </Suspense>
  );
}
