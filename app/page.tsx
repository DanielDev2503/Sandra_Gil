import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import StoreShell from '@/components/StoreShell';
import { OFFICIAL_AROMAS } from '@/lib/aromas';

export const revalidate = 0; // Dynamic rendering for real-time stock levels

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sandragilvelas.com',
  },
};

export default async function Home() {
  // Fetch active products with variations and official active aromas from DB
  const [products, aromasDb] = await Promise.all([
    prisma.producto.findMany({
      where: { activo: true },
      include: {
        variaciones: {
          where: { activo: true },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { nombre: 'asc' },
    }),
    prisma.aroma.findMany({
      where: { activo: true },
      select: { nombre: true },
      orderBy: { nombre: 'asc' },
    }),
  ]);

  const availableAromas =
    aromasDb.length > 0 ? aromasDb.map((a) => a.nombre) : [...OFFICIAL_AROMAS];

  // Hero: product with the least stock (but still in stock), else first non-custom product, else first product
  const heroProduct =
    products
      .filter((p) => p.stock > 0 && !p.esBajoPedido)
      .sort((a, b) => a.stock - b.stock)[0] ??
    products.find((p) => !p.esBajoPedido) ??
    products[0] ??
    null;

  return (
    <StoreShell
      products={products}
      heroProduct={heroProduct}
      availableAromas={availableAromas}
    />
  );
}
