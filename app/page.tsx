import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import StoreShell from '@/components/StoreShell';
import { OFFICIAL_AROMAS } from '@/lib/aromas';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // SSR en tiempo real: consulta directa a Supabase en cada petición para reflejar cambios instantáneamente

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
        variaciones: {
          where: { activo: true },
          select: {
            id: true,
            nombre: true,
            imagen: true,
            precio: true,
            activo: true,
          },
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
    aromasDb.length > 0 ? aromasDb.map((a: { nombre: string }) => a.nombre) : [...OFFICIAL_AROMAS];

  // Hero: product with the least stock (but still in stock), else first non-custom product, else first product
  const heroProduct =
    products
      .filter((p: { stock: number; esBajoPedido: boolean }) => p.stock > 0 && !p.esBajoPedido)
      .sort((a: { stock: number }, b: { stock: number }) => a.stock - b.stock)[0] ??
    products.find((p: { esBajoPedido: boolean }) => !p.esBajoPedido) ??
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
