import { prisma } from '@/lib/db';
import CatalogShell from './CatalogShell';
import { Suspense } from 'react';

export const revalidate = 0; // Dynamic rendering for real-time stock levels

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
